/** @jsxImportSource @emotion/react */
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { css } from "@emotion/react";
import { Link } from "./Link";
import { encodeAddress, isPublicKey } from "../utils/formatAddress";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AccountArrayContext } from "../hooks/useAccountsArrayContext";

const valueTableStyle = css`
	width: 100%;
	word-break: initial;

	th, td > & {
		//margin: -6px 0px;
	}

	th, td {
		vertical-align: top;
		padding: 0;
	}

	td:first-of-type {
		font-weight: 400;
		font-size: 16px;
		line-height: 22px;
	}
`;

const paramIndexCellStyle = css`
	width: 60px;
`;

const paramNameCellStyle = css`
	width: 180px;
`;

const paramIndexStyle = css`
	font-weight: 300;
	word-break: break-all;
	box-sizing: border-box;
	width: 60px;
	padding: 6px 0;
	padding-right: 16px;
`;

const paramNameStyle = css`
	font-weight: 700;
	word-break: break-all;
	box-sizing: border-box;
	width: 180px;
	padding: 6px 0;
	padding-right: 32px;
`;

const paramValueStyle = css`
	word-break: break-all;
	min-width: 100px;
	max-width: 550px;
	padding: 6px 0;
`;

export type EventParamValueProps = {
	value: any;
};

type AccountPageParams = {
	network: string;
};

const renderValue = (value: any) => {
	const verifiedAccounts = useContext(AccountArrayContext);
	const { network } = useParams() as AccountPageParams;

	if (!verifiedAccounts.includes(value)) {
		if (!isPublicKey(value)) return (
			<ParamsValue value={value} />
		);
		verifiedAccounts.push(value);
	}
	
	return (
		<Link to={"/kusama/search?query=".concat(value)}>{
			encodeAddress(network, value) ||
			value
		}</Link>
	);	
};

function ParamsValue(props: EventParamValueProps) {
	let { value } = props;

	if (Array.isArray(value) && value.length > 0) {
		return (
			<Table size="small" css={valueTableStyle}>
				<TableBody>
					{value.map((item, index) => (
						<TableRow key={index}>
							<TableCell css={paramIndexCellStyle}>
								<div css={paramIndexStyle}>{index}</div>
							</TableCell>
							<TableCell>
								{
									renderValue(item)
								}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	} else if (Array.isArray(value) && value.length === 0) {
		value = "[ ]";
	} else if (value && typeof value === "object") {
		const keys = Object.keys(value);
		keys.sort();
		return (
			<Table size="small" css={valueTableStyle}>
				<TableBody>
					{keys.map((key) => (
						<TableRow key={key}>
							<TableCell css={paramNameCellStyle}>
								<div css={paramNameStyle}>{key}</div>
							</TableCell>
							<TableCell>
								{
									renderValue(value[key])
								}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	} else if (typeof value === "boolean") {
		value = value ? "true" : "false";
	}

	return <div css={paramValueStyle}>{value}</div>;
}

export default ParamsValue;
