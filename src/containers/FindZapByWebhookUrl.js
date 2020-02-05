import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import { FaSearch } from "react-icons/fa";

export default function FindZapByWebhookId(props) {
  const [webhookUrl, setWebhookUrl] = React.useState(props.webhookUrl);
  const handleClick = event => {
    console.log("webhook URL", webhookUrl);
  };

  return (
    <Card color="transparent">
      <CardHeader title="Find Zap By Webhook URL" />
      <CardContent>
        <TextField
          variant="outlined"
          fullWidth
          id="webhook-url"
          label="Webhook URL"
          placeholder="https://hooks.zapier.com/hooks/catch/1808443/ou2v4ax/"
          onInput={event => {
            setWebhookUrl(event.target.value);
          }}
        />
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          startIcon={<FaSearch size={"0.8em"} />}
          onClick={handleClick}
        >
          Find Zap
        </Button>
      </CardActions>
    </Card>
  );
}
