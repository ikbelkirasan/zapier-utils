import React from "react";
import styled from "styled-components";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import {
  FiSearch as SearchIcon,
  FiRefreshCcw as ReloadIcon
} from "react-icons/fi";
import {
  FaCheckCircle as SuccessIcon,
  FaTimesCircle as ErrorIcon
} from "react-icons/fa";
import { Typography } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  linkButton: {
    textTransform: "lowercase"
  }
}));

const ResultBox = styled(Box)`
  border-radius: 8px;
  border: dashed 1px ${props => props.color};
`;

/*global chrome */
export default function FindZapByWebhookId(props) {
  const classes = useStyle();

  const [webhookUrl, setWebhookUrl] = React.useState("https://");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const startSearching = url => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        const message = {
          source: "extension",
          payload: {
            action: "findZapByWebhookUrl",
            url
          }
        };

        chrome.tabs.sendMessage(tab.id, message, response => {
          if (chrome.runtime.lastError) {
            return reject(new Error(chrome.runtime.lastError.message));
          }
          resolve(response);
        });
      });
    });
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const result = await startSearching(webhookUrl);
      setResult(result);
    } catch (error) {
      console.log("error", error);
      setResult({
        type: "error",
        error
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Card>
        <CardHeader
          title="Find Zap by Webhook URL"
          subheader="This scans your zaps to find which one is associated with the webhook URL you provide here."
        />
        <CardContent>
          {result && result.type === "success" && (
            <ResultBox color="#0cce6b" paddingX={2} paddingY={1}>
              <Box display="flex" alignItems="center">
                <SuccessIcon size={"1.2em"} />
                <Box paddingX={1} />
                <Typography variant="h6">Found it!</Typography>
              </Box>
              <Link
                target="_blank"
                color="secondary"
                component={Button}
                href={result.url}
                className={classes.linkButton}
              >
                {result.url}
              </Link>
            </ResultBox>
          )}
          {result && result.type === "error" && (
            <ResultBox color="#ea3546" paddingX={2} paddingY={1}>
              <Box display="flex">
                <ErrorIcon size={"1.2em"} />
                <Box paddingX={1} display="flex" flexDirection="column">
                  <Typography variant="h6">Could not find the zap.</Typography>
                  {result.error && (
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" paragraph>
                        {result.error}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </ResultBox>
          )}
          {!result && (
            <Box>
              <TextField
                autoFocus
                variant="outlined"
                fullWidth
                id="webhook-url"
                label="Webhook URL"
                placeholder="https://hooks.zapier.com/hooks/catch/1808443/ou2v4ax/"
                defaultValue={webhookUrl}
                onInput={event => {
                  setWebhookUrl(event.target.value);
                }}
              />
            </Box>
          )}
        </CardContent>
        <CardActions>
          <Box paddingX={1} flex={1} display="flex" justifyContent="flex-end">
            <Box>
              {!result && !loading && (
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<SearchIcon size={"0.8em"} />}
                  onClick={handleClick}
                >
                  Find Zap
                </Button>
              )}
              {result && !loading && (
                <Button
                  color="primary"
                  startIcon={<ReloadIcon size={"0.8em"} />}
                  onClick={handleReset}
                >
                  Find another Zap
                </Button>
              )}
            </Box>
          </Box>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
