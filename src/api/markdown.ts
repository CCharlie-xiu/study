import type {
  ListResult,
  MarkdownCreateRequest,
  MarkdownFilter,
  MarkdownType,
  NoteType
} from "@/api/types";
import request from "@/api/request";

const list = (filter: MarkdownFilter): Promise<ListResult<MarkdownType>> => {
  return request.get("/markdowns", {
    params: filter,
  });
};

const create = (markdownCreateRequest: MarkdownCreateRequest): Promise<MarkdownType> => {
  return request.post("/markdowns", markdownCreateRequest);
};

// Todo:
const edit = (
  id: string,
  markdownEditRequest: MarkdownCreateRequest
): Promise<MarkdownType> => {
  return request.post(`/markdowns/${id}`, markdownEditRequest);
};

const showAll = (): Promise<NoteType> => {
  return request.get("/list");
};


export default {
  list,
  create,
  edit,
  showAll,
};