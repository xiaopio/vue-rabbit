// 封装分类数据业务相关代码
import { ref, onMounted } from "vue"
import { getTopCategoryAPI } from "@/apis/category"
import { useRoute, onBeforeRouteUpdate } from "vue-router"

export function useCategory() {
  const route = useRoute();
  // 获取数据
  const categoryData = ref(null);
  const getCategoryData = async (id = route.params.id) => {
    const res = await getTopCategoryAPI(id)
    categoryData.value = res.result
  }

  // 目标:路由参数变化的时候 可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    // console.log('路由参数变化了');
    // 重新获取数据，存在问题，使用最新的路由参数请求最新的分类数据
    // console.log(to);
    getCategoryData(to.params.id)

  })

  onMounted(() => {
    getCategoryData()
  });

  return {
    categoryData
  }
} 
