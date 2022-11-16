import { ReactNode } from "react";
import {
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";

import { Pagination } from "../../hooks/usePagination";
import { encodeAddress } from "../../utils/formatAddress";
import { shortenHash } from "../../utils/shortenHash";

import CopyToClipboardButton from "../CopyToClipboardButton";
import ItemsTable from "../ItemsTable";
import { Link } from "../Link";
import { Time } from "../Time";

export type ExtrinsicsTableProps = {
	network: string;
	items: any[];
	pagination: Pagination;
	title?: ReactNode;
	columns?: string[];
	loading?: boolean;
	notFound?: boolean;
	error?: any;
};

function ExtrinsicsTable(props: ExtrinsicsTableProps) {
	const {
		network,
		items,
		pagination,
		columns = ["id", "name", "signer", "time"],
		loading,
		notFound,
		error
	} = props;

	return (
		<ItemsTable
			loading={loading}
			notFound={notFound}
			notFoundMessage="No extrinsics found"
			error={error}
			pagination={pagination}
			data-test="extrinsics-table"
		>
			<TableHead>
				<TableRow>
					{columns.find((value) => value === "id") && <TableCell>Id</TableCell>}
					{columns.find((value) => value === "name") && (
						<TableCell>Name</TableCell>
					)}
					{columns.find((value) => value === "hash") && (
						<TableCell>Hash</TableCell>
					)}
					{columns.find((value) => value === "signer") && (
						<TableCell>Account</TableCell>
					)}
					{columns.find((value) => value === "time") && (
						<TableCell>Time</TableCell>
					)}
				</TableRow>
			</TableHead>
			<TableBody>
				{items.map((extrinsic: any) => (
					<TableRow key={extrinsic.id}>
						{columns.find((value) => value === "id") && (
							<TableCell>
								<Link to={`/${network}/extrinsic/${extrinsic.id}`}>
									{extrinsic.id}
								</Link>
							</TableCell>
						)}
						{columns.find((value) => value === "hash") && (
							<TableCell>{shortenHash(extrinsic.hash)}</TableCell>
						)}
						{columns.find((value) => value === "name") && (
							<TableCell>{extrinsic.call.name}</TableCell>
						)}
						{columns.find((value) => value === "signer") && (
							<TableCell>
								<Link
									to={`/${network}/account/${extrinsic.signature?.address}`}
								>
									{shortenHash(
										(network &&
											encodeAddress(network, extrinsic.signature?.address)) ||
										extrinsic.signature?.address
									)}
								</Link>
							</TableCell>
						)}
						{columns.find((value) => value === "time") && (
							<TableCell>
								<Time time={extrinsic.block.timestamp} fromNow />
							</TableCell>
						)}
					</TableRow>
				))}
			</TableBody>
		</ItemsTable>
	);
}

export default ExtrinsicsTable;
