import "./styles.css";
import { renderReactMaterials } from "./reactComponentRuntime.jsx";

window.renderReactMaterials = renderReactMaterials;

async function useLocalDevelopmentUser() {
  if (!import.meta.env.DEV) return false;
  try {
    const response = await fetch("/api/auth/dev-login", { method: "POST" });
    const result = await response.json();
    if (!response.ok || !result.success || !result.data) return false;
    window.currentUser = result.data;
    console.info("本地开发模式：使用模拟用户身份");
    return true;
  } catch {
    return false;
  }
}

// 登录检查
async function checkAuth() {
  try {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    if (!data.success || !data.data) {
      if (await useLocalDevelopmentUser()) return true;
      // 未登录，跳转到飞书登录页
      window.location.href = "/api/auth/login?state=" + encodeURIComponent(window.location.pathname);
      return false;
    }
    // 已登录，显示用户信息
    window.currentUser = data.data;
    return true;
  } catch (error) {
    console.error("登录检查失败:", error);
    return await useLocalDevelopmentUser();
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
