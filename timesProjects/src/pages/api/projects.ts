import { NextApiRequest, NextApiResponse } from "next";
import commonConfig from "../../utils/commonConfig";
import allInOneMiddleware from "../../utils/middleware/allInOneMiddleware";
import ProjectRepository from "../../repository/projectRepository";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	return new Promise((resolve) => {
		let projRepo = new ProjectRepository();
		if (req.method == "PUT") {
			let payload = {
				...req.body,
			};
			projRepo.createProject(payload).then((result) => {
				res.status(200).json({
					content: result,
					status: "success",
				});
				res.end();
				return resolve();
			});
		} else if (req.method == "GET") {
			let query = {};
			if (req.query) {
				console.log("getProjects req", req.query.pageSize, req.query.page);
				query["sortOn"] = JSON.parse(req.query.sortOn || "{}");
				if (
					!Array.isArray(req.query.pageSize) &&
					!Array.isArray(req.query.page)
				) {
					if (!isNaN(req.query.pageSize) && !isNaN(req.query.page)) {
						query["limit"] = parseInt(req.query.pageSize);
						// parseInt(req.query.pageSize) * (parseInt(req.query.page) + 1);
						query["start"] =
							parseInt(req.query.page) * parseInt(req.query.pageSize);
					}
					console.log("query", query);
				} else {
					query["limit"] = 4;
					query["start"] = 0;
				}
				query["filters"] = JSON.parse(req.query.filterOn || "{}");
				console.log("filters", query["filters"]);
			}
			projRepo.getProjects(query).then((project) => {
				if (project) {
					res.status(200).json({
						content: project,
						status: "success",
					});
				} else {
					res.status(502);
				}
				res.end();
				return resolve();
			});
		}
		return resolve();
	});
};
export default allInOneMiddleware(handler);

export const config = {
	...commonConfig,
};
