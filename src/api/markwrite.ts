import type {
  MarkwriteGetRequest,
  MarkwriteType,
  NoteType,
} from "@/api/types";
import request from "@/api/request";

const list = (): Promise<NoteType> => {
  return request.get("/list");
};

const searchList = (notename: string): Promise<NoteType> => {
  return request.post("/notesearch", {notename});
};

const edit = (
  id: string,
  markwriteEditRequest: MarkwriteGetRequest
): Promise<MarkwriteType> => {
  return request.post(`/markwrites/${id}`, markwriteEditRequest);
};

export default {
  list,
  searchList,
  edit,
};