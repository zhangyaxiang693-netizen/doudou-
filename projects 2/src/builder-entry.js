import "./styles.css";
import { renderReactMaterials } from "./reactComponentRuntime.jsx";

window.renderReactMaterials = renderReactMaterials;

// 登录检查
async function checkAuth() {
  try {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    if (!data.success || !data.data) {
      // 未登录，跳转到飞书登录页
      window.location.href = "/api/auth/login?state=" + encodeURIComponent(window.location.pathname);
      return false;
    }
    // 已登录，显示用户信息
    window.currentUser = data.data;
    return true;
  } catch (error) {
    console.error("登录检查失败:", error);
    return false;
  }
}

// 先检查登录，再加载应用
checkAuth().then((isAuthenticated) => {
  if (isAuthenticated) {
    renderReactMaterials();

    import("./app.js")
      .then(() => {
        renderReactMaterials();
      })
      .catch((error) => {
        console.error(error);
        const app = document.querySelector("#app");
        if (app) app.textContent = error instanceof Error ? error.message : String(error);
      });
  }
});
