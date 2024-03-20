import type {
  MarkwriteGetRequest,
  MarkwriteType,
  NoteType,
  MarkCreateType
} from "@/api/types";
import request from "@/api/request";

const list = (username:string): Promise<Array<any>> => {
  return request.post("/notelist",{username});
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

const create = (text:string, storename: string,notename: string,keysword: string,username:string): Promise<MarkCreateType> => {
  return request.post("/createnote",{text,storename,notename,keysword,username});
}

const deleteNote = (username:string, notename:string):Promise<number> => {
  return request.post("/deletenote",{username,notename})
} 

const sreachNote = (username:string,Keysword:string): Promise<Array<string>> =>{
  return request.post("/notesearch",{username,Keysword});
}

const addressNote = (username:string, notename:string): Promise<string> =>{
  return request.post("/shownote",{username,notename})
}

const notestore = (username:string, storename:string): Promise<string> => {
  return request.post("/notestore",{username,storename})
}

const updatenote = (username:string, notename:string,text:string): Promise<number> => {
  return request.post("/updatenote",{username,notename,text})
}

export default {
  list,
  searchList,
  edit,
  create,
  deleteNote,
  sreachNote,
  addressNote,
  notestore,
  updatenote
};