import { StrictMode } from "react";
import ReactDOM from "react-dom";
import DraggableTable from './DraggableTable'

const rootElement = document.getElementById("root");
ReactDOM.render(
	<StrictMode>
		<DraggableTable />
	</StrictMode>,
	rootElement
);
