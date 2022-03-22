/*global chrome*/

const actions = {
  findZapByWebhookUrl(url) {
    const getNodes = (zap) => {
      let nodes = [];
      for (let nodeId in zap.nodes) {
        const node = zap.nodes[nodeId];
        nodes.push(node);
      }

      return nodes;
    };

    const getZapNodes = async (zapId) => {
      const response = await fetch(
        `https://zapier.com/api/v3/zaps/${zapId}/nodes`
      );
      const { objects: nodes = [] } = await response.json();
      return nodes;
    };

    const fetchAccounts = async () => {
      const response = await fetch("https://zapier.com/api/v3/accounts");
      const { objects: accounts = [] } = await response.json();
      return accounts;
    };

    const fetchZaps = async (accountId) => {
      const response = await fetch(
        `https://zapier.com/api/v3/zaps?account_id=${accountId}`
      );
      const zaps = await response.json();
      return zaps;
    };

    const getAllZaps = async () => {
      const accounts = await fetchAccounts();
      const allZaps = [];
      for (const accountIndex in accounts) {
        const account = accounts[accountIndex];
        const { objects: zaps = [] } = await fetchZaps(account.id);
        allZaps.push(...zaps);
      }
      return allZaps;
    };

    const getZapFromWebhookId = async (zapId, webhookId) => {
      const nodes = await getZapNodes(zapId);
      const webhookZap = nodes.find((obj) => {
        return obj.code === webhookId;
      });

      return webhookZap;
    };

    const findWebhooks = (zap) => {
      const nodes = getNodes(zap);
      const webhookNodes = nodes.filter((node) => {
        return node["selected_api"] === "WebHookAPI";
      });

      return webhookNodes.map((node) => {
        return {
          ...node,
          zapId: zap.id,
        };
      });
    };

    const getWebhooks = (zaps) => {
      const webhookZaps = [];
      for (let zapId in zaps) {
        const zap = zaps[zapId];
        webhookZaps.push(...findWebhooks(zap));
      }
      return webhookZaps;
    };

    const parseWebhookUrl = (webhookUrl) => {
      const regex =
        /https\:\/\/hooks\.zapier\.com\/hooks\/catch\/(\w+)\/(\w+)\/?/;
      const matches = regex.exec(webhookUrl);
      if (!matches) {
        throw new Error("Invalid Webhook URL");
      }

      const [, accountId, webhookId] = matches;
      return {
        accountId,
        webhookId,
      };
    };

    const findZapForWebhookUrl = async (webhookUrl) => {
      const zaps = await getAllZaps();
      const webhookZaps = getWebhooks(zaps);
      const { webhookId } = parseWebhookUrl(webhookUrl);
      for (const webhookZapIndex in webhookZaps) {
        const webhookZap = webhookZaps[webhookZapIndex];
        const zap = await getZapFromWebhookId(webhookZap.id, webhookId);
        if (zap) {
          return zap;
        }
      }
    };

    async function run(webhookUrl) {
      console.log(
        "⌛ Looking for the zap that matches your webhook URL. Please wait..."
      );
      const zap = await findZapForWebhookUrl(webhookUrl);

      if (!zap) {
        console.error("❌ Could not find the zap");
        return null;
      }

      const zapUrl = `https://zapier.com/app/editor/${zap.id}`;
      console.log(`⚡ Found the zap:`, zapUrl);

      return zapUrl;
    }

    return run(url);
  },
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.source === "extension") {
    const { payload } = message;

    if (payload.action === "findZapByWebhookUrl") {
      actions
        .findZapByWebhookUrl(payload.url)
        .then((zapUrl) => {
          if (zapUrl) {
            sendResponse({
              type: "success",
              url: zapUrl,
            });
          } else {
            sendResponse({
              type: "error",
            });
          }
        })
        .catch((error) => {
          sendResponse({
            type: "error",
            error: error.message,
          });
        });

      return true; // keep the channel open until we call `sendResponse`
    }
  }
});
