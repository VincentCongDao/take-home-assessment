import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const BackButton = () => {
  return (
    <div className="backbutton-container">
      <ArrowBackIosNewIcon fontSize="small" />
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default BackButton;
