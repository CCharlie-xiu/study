import { MessagePlugin, type CellData } from "tdesign-vue-next"
import { ref, type Ref } from "vue"
import type { Editable } from "@/api/types"

export const useEditDialog = <T extends {id:string},R>(api:Editable<R,T>,modelLabel = "") => {

    const showdialog = ref(false)
    const editData = <Ref<null | T>>ref(null)
    const handlerCreate = () => {
        showdialog.value = true
    }
    const handlerEdit = (item: CellData<T>) => {
        editData.value = item.row
        showdialog.value = true
    }

    const handlerConfirm = async (data: R) => {
        if(editData.value && editData.value.id) {
            await api.edit(editData.value.id,data)
            await MessagePlugin.success(`${modelLabel }successfully`)
        } else {
            await api.create(data)
            await MessagePlugin.success(`${modelLabel }successfully`)
        }
        onDialogClose()
    }
    
    const onDialogClose = () => {
        showdialog.value = false
        editData.value = null
    }

   
    return {
        showdialog,
        editData,
        handlerCreate,
        handlerEdit,
        onDialogClose,
        handlerConfirm
    }
}