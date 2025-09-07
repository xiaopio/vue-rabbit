// 封装banner轮播图相关业务代码
import { ref, onMounted } from "vue";
import { getBannerAPI } from "@/apis/home.js";
export function useBanner() {
  const bannerList = ref([]);
  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2'
    });
    bannerList.value = res.result;
  }

  onMounted(async () => {
    getBanner()
  });

  return {
    bannerList
  };
}
