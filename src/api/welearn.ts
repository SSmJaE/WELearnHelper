// import { VERSION } from "@src/store";
// import { addMessage } from "@src/store/actions";

import metadata from "@/metadata.json";
import logger from "@utils/logger";

import { backendErrorToString, perSession, requestErrorHandler } from "./decorators";
import request from "@utils/polyfill/request";
import { ICommonResponse } from "./types";

interface IQuestionWithAnswer {
    questionId: string;
    questionType: number;
    answerId?: string;
    answerText?: string;
}

interface IGetCourseCatalog {
    dataSolution: string[];
    et: string[];
    manifest: string[];
    reading: string[];
    app: string[];
}

type ICheckVersionReturn = ICommonResponse<string[]>;
type IQueryByTaskIdResponse = ICommonResponse<IQuestionWithAnswer[]>;
type IQueryByQuestionIdResponse = ICommonResponse<IQuestionWithAnswer[]>;
type IQueryByDomStringResponse = ICommonResponse<IQuestionWithAnswer[]>;
type IGetCourseCatalogResponse = ICommonResponse<IGetCourseCatalog>;

enum QueryTypes {
    queryByTaskId,
    queryByQuestionId,
    queryByDomString,
}

export class WELearnAPI {
    @requestErrorHandler("脚本版本查询异常")
    @perSession("LAST_CHECK_DATE")
    static async checkVersion() {
        const response = await request.post<ICheckVersionReturn>("/version/", {
            body: {
                version: metadata.projects.welearn.version,
            },
        });

        const returnJson = await response.json();

        if (returnJson.status === false) {
            throw new Error(backendErrorToString(returnJson.error));
        } else {
            for (const message of returnJson.data) {
                logger.info(message);
            }
        }
    }

    @requestErrorHandler("答案查询失败")
    static async queryByTaskId(taskId: number, isSchoolTest: boolean) {
        const response = await request.post<IQueryByTaskIdResponse>("/query/", {
            body: {
                queryType: QueryTypes.queryByTaskId,
                taskId: taskId,
                isSchoolTest,
            },
        });

        return await response.json();
    }

    @requestErrorHandler("答案查询失败")
    static async queryByQuestionId(questionId: string) {
        const response = await request.post<IQueryByQuestionIdResponse>("/query/", {
            body: {
                queryType: QueryTypes.queryByQuestionId,
                questionId: questionId,
            },
        });

        const returnJson = await response.json();

        if (returnJson.status === false) {
            throw new Error(backendErrorToString(returnJson.error));
        } else {
            return returnJson.data;
        }
    }

    @requestErrorHandler("答案查询失败")
    static async queryByDomString(domString: string) {
        const response = await request.post<IQueryByDomStringResponse>("/query/", {
            body: {
                queryType: QueryTypes.queryByDomString,
                domString: domString,
            },
        });

        const returnJson = await response.json();

        if (returnJson.status === false) {
            throw new Error(backendErrorToString(returnJson.error));
        } else {
            return returnJson.data;
        }
    }

    @requestErrorHandler("答案收录失败")
    static async collectAll(taskId: number, domString: string, isSchoolTest: boolean) {
        const response = await request.post<ICommonResponse>("/collect/", {
            body: {
                taskId: taskId,
                domString: domString,
                isSchoolTest,
            },
        });

        const returnJson = await response.json();

        if (returnJson.status === false) {
            throw new Error(backendErrorToString(returnJson.error));
        } else {
            logger.info(
                "当前页面答案收录成功，可以切换至下一页面，手动点击查询按钮上传，或者上传其它练习的答案",
            );
        }
    }

    // @requestErrorHandler("上传失败")
    static async upload(byUser = false) {
        const response = await request.post<ICommonResponse>("/upload/", {
            body: {
                url: location.href,
                cookie: document.cookie,
            },
        });

        const returnJson = await response.json();

        if (byUser) {
            if (returnJson.status) {
                logger.info("成功上传练习");
            } else {
                logger.error({
                    message: "练习上传失败",
                });
                logger.debug(returnJson.error);
            }
        }
    }

    @requestErrorHandler("课程目录获取失败")
    @perSession("HAS_GET_COURSE_CATALOG")
    static async getCourseCatalog() {
        const response = await request.post<IGetCourseCatalogResponse>("/catalog/");

        const returnJson = await response.json();

        if (returnJson.status === false) {
            throw new Error(backendErrorToString(returnJson.error));
        } else {
            logger.info("成功获取了最新的课程目录");

            return returnJson.data;
        }
    }
}
