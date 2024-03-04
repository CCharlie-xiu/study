import type { Searchable } from "@/api/types"
import type { PageInfo, PaginationProps } from "tdesign-vue-next"
import { onMounted, reactive, ref, type Ref } from "vue"

export const useSearch = <T,K>(api:Searchable<T>, searchKey:K) => {
    const data = <Ref<Array<T>>>ref([])
    const pagination = reactive<PaginationProps>({current:1, total:0,pageSize:6})


    const loading = ref(false)
    const fetchData = () => {
        loading.value = true
        api.list({
            page:pagination.current,
            size:pagination.pageSize,
            total:pagination,
            ...searchKey
        }).then(res => {
            data.value = res.data
            pagination.total = res.paging.page
            pagination.pageSize = res.paging.size
            pagination.total = res.paging.total
            loading.value = false
        }).catch(err => {
            loading.value = true
            throw new Error(err)
        })
    }

    onMounted(fetchData);

    const onPageChange = (pageInfo:PageInfo) => {
        pagination.current = pageInfo.current
        pagination.pageSize = pageInfo.pageSize
        fetchData()
    }
    return {
        data,
        pagination,
        loading,
        fetchData,
        onPageChange
    }
}