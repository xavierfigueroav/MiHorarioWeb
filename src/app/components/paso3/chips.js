import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import BlockIcon from "@material-ui/icons/Block";
import Tooltip from '@material-ui/core/Tooltip';
const DisabledChip = withStyles({
  root: {
    color: "gray",
    borderColor: "gray"
  }
})(Chip);
const SuccessChip = withStyles({
  root: {
    color: "green",
    borderColor: "green"
  },
  icon: {
    color: "green"
  }
})(Chip);
const WarningChip = withStyles({
  root: {
    color: "orange",
    borderColor: "orange"
  },
  icon: {
    color: "orange"
  }
})(Chip);
const ErrorChip = withStyles({
  root: {
    color: "red",
    borderColor: "red"
  },
  icon: {
    color: "red"
  }
})(Chip);
export function GetChip (valor){
	//{DisabledChip, SuccessChip, WarningChip, ErrorChip}
	if(valor >= 80){
		return <Tooltip title="Puntuación del profesor">
      <SuccessChip
        variant="outlined"
        size="small"
        icon={<InsertEmoticonIcon />}
        label={valor}
      />
    </Tooltip>
	}else if(valor < 80 && valor >=70){
		return <Tooltip title="Puntuación del profesor">
      <WarningChip
        variant="outlined"
        size="small"
        icon={<SentimentSatisfiedIcon />}
        label={valor}
      /></Tooltip>
	}else if(valor < 70 && valor >0){
		return <Tooltip title="Puntuación del profesor">
      <ErrorChip
        variant="outlined"
        size="small"
        icon={<SentimentVeryDissatisfiedIcon />}
        label={valor}
      /></Tooltip>
	}else{
		return <Tooltip title="Puntuación del profesor">
      <DisabledChip
        variant="outlined"
        size="small"
        icon={<BlockIcon />}
        label={"sin registros"}
      /></Tooltip>
	}
}