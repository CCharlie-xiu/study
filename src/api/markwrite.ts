import type {
  MarkwriteGetRequest,
  MarkwriteType,
  NoteType,
  MarkCreateType
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

const create = (text:string, storename: string,notename: string,keys: string): Promise<MarkCreateType> => {
  return request.post("/createnote",{text,storename,notename,keys});
}

export default {
  list,
  searchList,
  edit,
  create
};