import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	usePagination,
	usePaginationControls,
} from "@/sdk/hooks/usePagination";
import { useTimezone } from "@/sdk/hooks/useTimezone";
import { api } from "@/sdk/lib/api/factory";
import { cn } from "@/sdk/utils/cn";
import { Container } from "@/ui/Container";
import { InnerContainer } from "@/ui/Container/Inner";
import { Tooltip } from "@/ui/Tooltip";

export const AccountAuditHistory = () => {
	const { formatDate } = useTimezone();
	const { pagination, setPagination } = usePagination({
		initialPage: 1,
		initialSize: 20,
	});

	const { data, refetch, isFetching } = useQuery(
		api.query.miforge.accounts.audit.queryOptions({
			placeholderData: keepPreviousData,
			input: {
				page: pagination?.page,
				size: pagination?.size,
			},
		}),
	);

	const {
		canGoToNextPage,
		canGoToPreviousPage,
		goToNextPage,
		goToPreviousPage,
	} = usePaginationControls({
		pagination,
		setPagination,
		totalItems: data?.meta?.total,
		totalPages: data?.meta?.totalPages,
	});

	const auditHistory = data?.results ?? [];

	return (
		<Container
			title="Audit History"
			actions={
				<Tooltip content="Refresh History">
					<button
						type="button"
						disabled={isFetching}
						onClick={() => refetch()}
						className={cn(
							"cursor-pointer rounded bg-tibia-1000 p-0.5 text-sm disabled:cursor-not-allowed disabled:opacity-50",
							{
								"animate-spin": isFetching,
							},
						)}
					>
						<img
							alt="refresh history"
							src="/assets/icons/global/refresh-ccw-dot.png"
							className="h-4 w-4"
						/>
					</button>
				</Tooltip>
			}
		>
			<InnerContainer className="p-0">
				<table className="w-full border-collapse">
					<thead>
						<th className="w-[2%] border border-septenary p-1 text-start font-bold text-secondary">
							#
						</th>
						<th className="hidden border border-septenary p-1 text-start font-bold text-secondary sm:table-cell">
							Action
						</th>
						<th className="border border-septenary p-1 text-start font-bold text-secondary">
							Details
						</th>
						<th className="border border-septenary p-1 text-start font-bold text-secondary">
							IP
						</th>
						<th className="border border-septenary p-1 text-start font-bold text-secondary">
							Date
						</th>
					</thead>
					<tbody>
						{auditHistory.map((entry, index) => {
							return (
								<tr
									key={`${entry.id}-${entry.requestId}-${index}`}
									className="bg-tibia-900 even:bg-tibia-600"
								>
									<td className="border border-septenary p-1 text-center">
										<span className="font-bold text-secondary text-sm">
											{index + 1}.
										</span>
									</td>
									<td className="hidden border border-septenary p-1 text-secondary text-sm sm:table-cell">
										{entry.action}
									</td>
									<td className="border border-septenary p-1 text-secondary text-sm">
										{entry.details}
									</td>
									<td className="border border-septenary p-1 text-secondary text-sm">
										{entry.ip}
									</td>
									<td className="border border-septenary p-1 text-secondary text-sm">
										{formatDate(entry.createdAt, {
											year: "numeric",
											month: "2-digit",
											day: "2-digit",
											hour: "2-digit",
											minute: "2-digit",
											second: "2-digit",
										})}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</InnerContainer>
			<InnerContainer>
				<div className="flex flex-row justify-end gap-3">
					<Tooltip content="Previous Page">
						<button
							type="button"
							className={cn(
								"cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
							)}
							disabled={!canGoToPreviousPage}
							onClick={() => goToPreviousPage()}
						>
							<img
								alt="Previous Page"
								src="/assets/icons/global/back-to-top.gif"
								className="rotate-270 scale-x-[-1]"
							/>
						</button>
					</Tooltip>
					<span className="font-verdana text-secondary text-sm">
						Page {pagination.page} of {data?.meta?.totalPages ?? 1}
					</span>
					<Tooltip content="Next Page">
						<button
							type="button"
							className={cn(
								"cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
							)}
							disabled={!canGoToNextPage}
							onClick={() => goToNextPage()}
						>
							<img
								alt="Next Page"
								src="/assets/icons/global/back-to-top.gif"
								className="rotate-90"
							/>
						</button>
					</Tooltip>
				</div>
			</InnerContainer>
		</Container>
	);
};
