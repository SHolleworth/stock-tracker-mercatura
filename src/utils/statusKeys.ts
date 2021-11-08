type StatusType = {
	RESOLVED: "resolved";
	LOADING: "loading";
	ERROR: "error";
}

export type StatusStringType = "resolved" | "loading" | "error";

const STATUS : StatusType = {
	RESOLVED: "resolved",
	LOADING: "loading",
	ERROR: "error",
}

export default STATUS;