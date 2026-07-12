// ========== 全局配置（修改这里即可） ==========
const CONFIG = {
    BG_URL: 'https://api.tomys.top/api/acgimg',  // 背景图 URL
    SESSION_HOURS: 5,                              // 登录有效时长（小时）
};
// =============================================

const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>柒蓝个人导航页</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>⭐</text></svg>">
    <style>
    /* ❗核心修复1：全局强制使用 border-box，防止 padding 撑开宽度 */
    *, *::before, *::after {
        box-sizing: border-box;
    }

    /* 全局样式 */
    html, body {
        height: 100%; width: 100%; margin: 0; padding: 0; scroll-behavior: smooth;
        overflow-x: hidden; /* 严禁整体页面横向滚动 */
    }
    
    body {
        font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #121418; color: #222; transition: all 0.4s ease;
        background-image: url('${CONFIG.BG_URL}');
        background-size: cover; background-position: center top; background-attachment: fixed; background-repeat: no-repeat;
        min-height: 100vh;
    }

    body.dark-theme { background-color: #121418; color: #e3e3e3; }

    /* 滚动条美化 */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.2); border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.4); }
    body.dark-theme::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); }
    body.dark-theme::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.4); }

    /* ---------------- PC端固定顶部 (使用sticky解决遮挡) ---------------- */
    .fixed-elements {
        position: sticky; top: 0; left: 0; right: 0; z-index: 1000;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
        padding: 10px 10px 15px 10px; height: auto;
    }
    body.dark-theme .fixed-elements { background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%); }
    .fixed-elements h3 { display: none; }
    .center-content { width: 100%; max-width: 100%; text-align: center; padding: 0 10px; padding-top: 2vh;}

    /* 一言模块 */
    #hitokoto {
        margin: 0 auto 20px auto; font-size: 15px; color: #fff; font-style: italic; max-width: 600px;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6); letter-spacing: 0.5px;
    }
    #hitokoto span { color: #4dffb8; text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8); }
    body.dark-theme #hitokoto { color: #f1f2f6; text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8); }
    body.dark-theme #hitokoto span { color: #7ba1e9; }

    /* 搜索栏样式 - 现代毛玻璃胶囊 */
    .search-container { display: flex; flex-direction: column; align-items: center; width: 100%; }
    .search-bar {
        display: flex; justify-content: center; margin-bottom: 15px; width: 100%; max-width: 650px; margin: 0 auto 15px auto;
        border-radius: 40px; overflow: hidden; background-color: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.5); transition: all 0.3s ease;
    }
    .search-bar:focus-within { box-shadow: 0 6px 25px rgba(67, 184, 131, 0.25); border-color: rgba(67, 184, 131, 0.5); transform: translateY(-2px); }
    .search-bar select {
        border: none; background-color: transparent; padding: 12px 10px 12px 20px; font-size: 14px; font-weight: 600; color: #43b883;
        width: 115px; outline: none; appearance: none; background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6"><path fill="%2343b883" d="M0 0l6 6 6-6z"/></svg>');
        background-repeat: no-repeat; background-position: right 10px center; cursor: pointer; border-right: 1px solid rgba(0,0,0,0.06);
    }
    .search-bar input { flex: 1; border: none; padding: 12px 20px; font-size: 15px; background-color: transparent; outline: none; color: #333; min-width: 0; }
    .search-bar button { border: none; background-color: transparent; color: #43b883; padding: 0 25px; cursor: pointer; font-size: 18px; transition: all 0.2s; }
    .search-bar button:hover { background-color: rgba(67, 184, 131, 0.1); color: #35a674; }

    body.dark-theme .search-bar { background-color: rgba(30, 33, 40, 0.75); border-color: rgba(255, 255, 255, 0.1); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); }
    body.dark-theme .search-bar:focus-within { border-color: rgba(93, 127, 185, 0.5); box-shadow: 0 6px 25px rgba(93, 127, 185, 0.2); }
    body.dark-theme .search-bar select { color: #5d7fb9; border-right-color: rgba(255,255,255,0.05); background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6"><path fill="%235d7fb9" d="M0 0l6 6 6-6z"/></svg>'); }
    body.dark-theme .search-bar input { color: #e3e3e3; }
    body.dark-theme .search-bar button { color: #5d7fb9; }
    body.dark-theme .search-bar button:hover { background-color: rgba(93, 127, 185, 0.15); }
    select option { background-color: #fff; color: #333; padding: 10px; }
    body.dark-theme select option { background-color: #252830; color: #e3e3e3; }

    /* 分类快捷按钮 */
    .category-buttons-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; padding: 5px 12px; width: 100%; max-width: 1200px; margin: 5px auto 0; }
    .category-buttons-container::-webkit-scrollbar { height: 0; }
    .category-button {
        padding: 6px 16px; border-radius: 20px; background-color: rgba(255, 255, 255, 0.75); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        color: #43b883; border: 1px solid rgba(255, 255, 255, 0.3); cursor: pointer; font-size: 13px; font-weight: 500;
        transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); flex: 0 0 auto; white-space: nowrap;
    }
    body.dark-theme .category-button { background-color: rgba(30, 33, 40, 0.65); border-color: rgba(255, 255, 255, 0.05); color: #7ba1e9; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); }
    .category-button:hover { background-color: #43b883; color: white; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(67, 184, 131, 0.3); border-color: transparent; }
    .category-button.active { background-color: #43b883; color: white; box-shadow: 0 4px 12px rgba(67, 184, 131, 0.4); transform: translateY(-1px); font-weight: bold; border-color: transparent; }
    body.dark-theme .category-button:hover, body.dark-theme .category-button.active { background-color: #5d7fb9; color: white; box-shadow: 0 4px 12px rgba(93, 127, 185, 0.4); border-color: transparent; }
    .top-right-controls { display: none; }

    /* ---------------- 主要内容区域 ---------------- */
    .content {
        margin-top: 15px;
        padding: 10px; max-width: 1600px; width: 100%; margin-left: auto; margin-right: auto;
        transition: opacity 0.3s ease; padding-bottom: 70px;
    }
    .loading .content { opacity: 0.6; }

    /* ========= 双级分类标题样式 ========= */
    /* 一级分类大标题 */
    .parent-section { margin-bottom: 50px; width: 100%; scroll-margin-top: 120px; }
    .parent-title-container { 
        display: flex; align-items: center; margin-bottom: 25px; padding-bottom: 12px; 
        border-bottom: 2px solid rgba(67, 184, 131, 0.4); max-width: 1540px; margin-left: auto; margin-right: auto; width: 100%;
    }
    body.dark-theme .parent-title-container { border-bottom-color: rgba(93, 127, 185, 0.4); }
    .parent-title { font-size: 26px; font-weight: bold; color: #43b883; margin: 0; text-shadow: 0 2px 5px rgba(0,0,0,0.3); }
    body.dark-theme .parent-title { color: #7ba1e9; }

    /* 二级分类小标题 */
    .section { margin-bottom: 30px; padding: 0 15px 0 35px; width: 100%; }
    .section-title-container { display: flex; align-items: center; border-bottom: 1px dashed rgba(255, 255, 255, 0.2); padding-bottom: 8px; margin-bottom: 18px; width: 100%; }
    body.dark-theme .section-title-container { border-bottom-color: rgba(255, 255, 255, 0.08); }
    .section-title { font-size: 18px; font-weight: 600; color: #ffffff; position: relative; padding-left: 16px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); }
    .section-title:before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 5px; height: 18px; background-color: #f39c12; border-radius: 4px; box-shadow: 0 0 8px rgba(243, 156, 18, 0.5); }
    body.dark-theme .section-title { color: #e3e3e3; }
    
    /* 书签卡片样式 - 高级毛玻璃 */
    .card-container { 
        display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); 
        column-gap: 20px; row-gap: 20px; justify-content: start; 
        padding: 5px 5px 5px 25px; margin: 0; width: 100%; 
    }
    
    .card {
        background-color: rgba(255, 255, 255, 0.85); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 12px; padding: 14px; 
        width: 100%; min-width: 0; /* ❗核心修复2：限制卡片最小宽度，防止被撑开 */
        box-sizing: border-box; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); cursor: pointer; transition: all 0.3s ease; position: relative; user-select: none;
        border-left: 4px solid #43b883; animation: fadeIn 0.4s ease forwards; animation-delay: calc(var(--card-index) * 0.03s); opacity: 0;
    }
    
    .card.status-ok { border-left-color: #43b883; } .card.status-error { border-left-color: #e74c3c; } .card.status-warning { border-left-color: #9b59b6; }
    body.dark-theme .card { background-color: rgba(30, 33, 40, 0.75); border-color: rgba(255, 255, 255, 0.05); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
    .card:hover { transform: translateY(-6px); box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1); background-color: rgba(255, 255, 255, 0.95); }
    body.dark-theme .card:hover { background-color: rgba(45, 50, 60, 0.9); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4); }

    .card.dragging { opacity: 0.8; transform: scale(1.05) !important; box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important; border: 2px dashed #43b883; z-index: 100; }
    body.dark-theme .card.dragging { border-color: #5d7fb9; }
    .card-top { display: flex; align-items: center; margin-bottom: 8px; width: 100%; min-width: 0; }
    .card-icon { width: 18px; height: 18px; margin-right: 8px; border-radius: 3px; flex-shrink: 0; }
    
    /* ❗核心修复3：强行限制文本容器宽度，不允许撑宽卡片 */
    .card-title { font-size: 15px; font-weight: 600; color: #2c3e50; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; flex: 1;}
    .card-url { font-size: 12px; color: #95a5a6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; width: 100%; min-width: 0;}
    
    body.dark-theme .card-title { color: #f1f2f6; } body.dark-theme .card-url { color: #a4b0be; }
    .card-tips { font-size: 11px; color: #aaa; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 1.4; min-height: 16px; }
    body.dark-theme .card-tips { color: #888; }

    .private-tag { background-color: #f39c12; color: white; font-size: 10px; font-weight: bold; padding: 3px 6px; border-radius: 4px; position: absolute; top: -8px; right: -8px; z-index: 5; box-shadow: 0 2px 5px rgba(243, 156, 18, 0.3); }
    .card-actions { position: absolute; top: -12px; right: -12px; display: flex; gap: 6px; z-index: 15; }
    .card-btn { width: 28px; height: 28px; border: none; border-radius: 50%; color: white; cursor: pointer; display: none; align-items: center; justify-content: center; transition: all 0.2s; box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2); }
    .card-btn:hover { transform: scale(1.15); box-shadow: 0 5px 12px rgba(0, 0, 0, 0.3); }
    .card-btn svg { width: 14px; height: 14px; stroke: currentColor; fill: none; display: block; margin: auto;}
    .edit-btn { background: #43b883; } .delete-btn { background: #e74c3c; } body.dark-theme .edit-btn { background: #5d7fb9; }

    /* 管理控制按钮浮动组 */
    .add-remove-controls { display: none; flex-direction: column; position: fixed; right: 25px; top: 50%; transform: translateY(-50%); align-items: center; gap: 15px; z-index: 900; }
    .round-btn { background-color: #43b883; color: white; border: none; border-radius: 50%; width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 15px rgba(67, 184, 131, 0.35); transition: all 0.3s; }
    .round-btn:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 6px 20px rgba(67, 184, 131, 0.5); }
    body.dark-theme .round-btn { background-color: #5d7fb9; box-shadow: 0 4px 15px rgba(93, 127, 185, 0.35); }
    body.dark-theme .round-btn:hover { box-shadow: 0 6px 20px rgba(93, 127, 185, 0.5); }
    .category-manage-btn.active { background-color: #e74c3c; box-shadow: 0 4px 15px rgba(231, 76, 60, 0.35);}
    .category-manage-btn.active:hover { background-color: #c0392b; box-shadow: 0 6px 20px rgba(231, 76, 60, 0.5);}

    .floating-button-group { position: fixed; bottom: 50px; right: 25px; display: flex; flex-direction: column; gap: 15px; z-index: 1000; }
    .floating-button-group button { width: 46px; height: 46px; border-radius: 50%; font-size: 20px; display: flex; align-items: center; justify-content: center; background-color: #43b883; color: white; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(67, 184, 131, 0.35); transition: all 0.3s; }
    .floating-button-group button:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 6px 20px rgba(67, 184, 131, 0.5); }
    body.dark-theme .floating-button-group button { background-color: #5d7fb9; box-shadow: 0 4px 15px rgba(93, 127, 185, 0.35); }
    body.dark-theme .floating-button-group button:hover { box-shadow: 0 6px 20px rgba(93, 127, 185, 0.5); }

    /* 弹窗样式 - 高级圆角模糊 */
    .dialog-overlay, .login-modal { display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100%; background-color: rgba(0, 0, 0, 0.5); backdrop-filter: blur(5px); justify-content: center; align-items: center; z-index: 2000; }
    .dialog-box, .login-modal-content { background-color: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.6); padding: 30px; border-radius: 16px; width: 380px; max-width: 90vw; box-sizing: border-box; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2); animation: dialogFadeIn 0.3s ease; }
    body.dark-theme .dialog-box, body.dark-theme .login-modal-content { background-color: rgba(30, 33, 40, 0.95); border-color: rgba(255,255,255,0.1); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); color: #e3e3e3; }
    @keyframes dialogFadeIn { from { opacity: 0; transform: translateY(-30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
    .dialog-title, .login-modal h3 { margin: 0 0 20px 0; color: #333; font-size: 20px; font-weight: 600;}
    body.dark-theme .dialog-title, body.dark-theme .login-modal h3 { color: #f1f2f6; }
    .dialog-box input[type="text"], .dialog-box select, .login-modal input { width: 100%; margin-bottom: 15px; padding: 12px 14px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; transition: all 0.3s; box-sizing: border-box; background-color: rgba(250,250,250,0.8); }
    .dialog-box input:focus, .dialog-box select:focus, .login-modal input:focus { border-color: #43b883; box-shadow: 0 0 0 3px rgba(67, 184, 131, 0.2); outline: none; background-color: #fff; }
    body.dark-theme .dialog-box input[type="text"], body.dark-theme .dialog-box select, body.dark-theme .login-modal input { background-color: rgba(20, 22, 28, 0.8); border-color: #444; color: #e3e3e3; }
    body.dark-theme .dialog-box input:focus, body.dark-theme .dialog-box select:focus { border-color: #5d7fb9; box-shadow: 0 0 0 3px rgba(93, 127, 185, 0.3); background-color: #1a1c23; }
    .dialog-box label { display: block; margin-bottom: 6px; font-weight: 500; color: #555; font-size: 13px;}
    body.dark-theme .dialog-box label { color: #a4b0be; }
    .dialog-buttons, .login-modal-buttons { display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px;}
    .dialog-box button, .login-modal button { border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; transition: all 0.2s; font-size: 14px; font-weight: 500; }
    .dialog-confirm-btn, .login-modal button:not(.cancel) { background-color: #43b883; color: white; }
    .dialog-confirm-btn:hover, .login-modal button:not(.cancel):hover { background-color: #35a674; transform: translateY(-1px); box-shadow: 0 4px 10px rgba(67, 184, 131, 0.3);}
    .dialog-cancel-btn, .login-modal button.cancel { background-color: #f0f2f5; color: #555; }
    .dialog-cancel-btn:hover, .login-modal button.cancel:hover { background-color: #e4e6e9; }
    body.dark-theme .dialog-confirm-btn, body.dark-theme .login-modal button:not(.cancel) { background-color: #5d7fb9; }
    body.dark-theme .dialog-confirm-btn:hover { background-color: #4a6fa5; box-shadow: 0 4px 10px rgba(93, 127, 185, 0.3);}
    body.dark-theme .dialog-cancel-btn, body.dark-theme .login-modal button.cancel { background-color: #3a3f4b; color: #e3e3e3; }
    body.dark-theme .dialog-cancel-btn:hover { background-color: #4a505e; }

    /* 分类管理按钮 */
    .edit-category-btn, .delete-category-btn, .move-category-btn { color: white; border: none; padding: 5px 10px; margin-left: 10px; border-radius: 6px; font-size: 12px; cursor: pointer; transition: all 0.2s; display: none; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    .edit-category-btn { background-color: #43b883; } .edit-category-btn:hover { background-color: #35a674; }
    .delete-category-btn { background-color: #e74c3c; } .delete-category-btn:hover { background-color: #c0392b; }
    .move-category-btn { background-color: #f39c12; padding: 5px 8px; display: inline-flex; align-items: center;}
    .move-category-btn:hover { background-color: #d68910; }
    body.dark-theme .edit-category-btn { background-color: #5d7fb9; } body.dark-theme .edit-category-btn:hover { background-color: #4a6fa5; }

    /* 悬浮提示框 */
    #custom-tooltip { position: absolute; display: none; z-index: 3000; background: rgba(44, 62, 80, 0.95); backdrop-filter: blur(4px); color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 13px; pointer-events: none; max-width: 300px; white-space: pre-wrap; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); border: 1px solid rgba(255,255,255,0.1); }
    body.dark-theme #custom-tooltip { background: rgba(93, 127, 185, 0.95); }

    /* 加载遮罩 */
    #loading-mask { position: fixed; top: 0; left: 0; width: 100vw; height: 100%; background-color: rgba(0,0,0,0.5); backdrop-filter: blur(5px); z-index: 7000; display: flex; align-items: center; justify-content: center; }
    .loading-content { background-color: rgba(255,255,255,0.95); padding: 25px 40px; border-radius: 16px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.2); color: #333; font-weight: 500; }
    body.dark-theme .loading-content { background-color: rgba(30,33,40,0.95); color: #e3e3e3; }
    .spinner { width: 36px; height: 36px; border: 3px solid #f3f3f3; border-top-color: #43b883; border-radius: 50%; margin: 0 auto 15px; animation: spin 1s linear infinite; }
    body.dark-theme .spinner { border-top-color: #5d7fb9; border-color-bottom: #444; border-left-color: #444; border-right-color: #444;}
    @keyframes spin { to { transform: rotate(360deg); } }

    /* 底部版权信息 */
    #copyright { position: fixed; bottom: 0; left: 0; width: 100%; height: 45px; background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%); display: flex; justify-content: center; align-items: center; font-size: 13px; z-index: 1000; pointer-events: none; }
    #copyright * { pointer-events: auto; }
    #copyright .copyright-container { display: flex; align-items: center; justify-content: center; gap: 20px; width: 100%; }
    #copyright p, #copyright .site-title { margin: 0; font-weight: 500; color: #fff; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8); }
    #copyright .site-title { font-size: 16px; font-weight: 600; }
    #copyright a { color: #4dffb8; text-decoration: none; transition: color 0.2s;}
    #copyright a:hover { color: #fff; text-decoration: underline; }
    body.dark-theme #copyright a { color: #7ba1e9; }
    #copyright .buttons-group { display: flex; gap: 10px; }
    #copyright .admin-btn, #copyright .login-btn { padding: 4px 12px; border-radius: 12px; font-size: 12px; border: none; cursor: pointer; background: rgba(255,255,255,0.2); color: #fff; backdrop-filter: blur(4px); transition: all 0.2s;}
    #copyright .login-btn { background: rgba(67, 184, 131, 0.8); }
    #copyright .admin-btn:hover { background: rgba(255,255,255,0.3); }
    #copyright .login-btn:hover { background: rgba(67, 184, 131, 1); }
    body.dark-theme #copyright .login-btn { background: rgba(93, 127, 185, 0.8); }

    /* 搜索结果 */
    .search-results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 15px 20px; background-color: rgba(255, 255, 255, 0.85); backdrop-filter: blur(10px); border-radius: 12px; border-left: 5px solid #43b883; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    body.dark-theme .search-results-header { background-color: rgba(30, 33, 40, 0.85); border-left-color: #5d7fb9; }
    .search-results-title { font-size: 18px; font-weight: bold; color: #333; }
    body.dark-theme .search-results-title { color: #e3e3e3; }
    .back-to-main { background-color: #43b883; color: white; border: none; border-radius: 6px; padding: 8px 16px; cursor: pointer; font-size: 14px; }
    body.dark-theme .back-to-main { background-color: #5d7fb9; }

    /* ================= ❗❗❗ 终极移动端布局修复 ❗❗❗ ================= */
    @media (max-width: 480px) {
        .content { margin-top: 10px; padding: 10px 5px; }
        .search-bar { max-width: 95%; border-radius: 25px; margin-bottom: 10px; }
        .search-bar select { width: 90px; padding: 10px 5px 10px 12px; font-size: 13px; }
        .search-bar input { padding: 10px 15px; font-size: 14px; }
        .search-bar button { padding: 0 15px; font-size: 16px; }
        
        .category-buttons-container { flex-wrap: nowrap; overflow-x: auto; justify-content: flex-start; padding: 5px 10px; margin-top: 0; }
        .category-button { padding: 5px 12px; font-size: 12px; }
        
        .parent-section { margin-bottom: 35px; scroll-margin-top: 100px; }
        .parent-title { font-size: 20px; padding-left: 10px;}
        .section { padding: 0 5px 0 10px; margin-bottom: 20px;}
        .section-title { font-size: 15px; padding-left: 12px;}
        .section-title:before { width: 4px; height: 15px; }

        /* ❗核心修复4：严格限制两列均分并设定最小宽为0，杜绝内容撑爆屏幕 */
        .card-container { 
            grid-template-columns: repeat(2, minmax(0, 1fr)); 
            gap: 10px; 
            padding: 5px 5px 5px 10px; 
        }
        
        .card { padding: 10px; border-radius: 10px;}
        
        /* 管理按钮避开截断 */
        .add-remove-controls { right: 15px; bottom: 120px; top: auto; transform: none; flex-direction: column; gap: 10px; }
        .round-btn { width: 38px; height: 38px; font-size: 18px; }
        .round-btn svg { width: 18px; height: 18px; }
        
        .floating-button-group { bottom: 20px; right: 15px; gap: 12px; }
        .floating-button-group button { width: 38px; height: 38px; font-size: 16px; }

        .dialog-box, .login-modal-content { width: 90vw; padding: 20px; margin: 0 auto; }
    }
    </style>
</head>

<body>
    <div class="fixed-elements">
        <div class="center-content">
            <p id="hitokoto"><span id="hitokoto_text">正在加载一言...</span></p>
            <div class="search-container">
                <div class="search-bar">
                    <select id="search-engine-select">
                        <option value="in_site">站内搜索</option>
                        <option value="baidu">百度</option>
                        <option value="bing">必应</option>
                        <option value="google">谷歌</option>
                        <option value="duckduckgo">DuckDuck</option>
                    </select>
                    <input type="text" id="search-input" placeholder="搜索书签...">
                    <button id="search-button">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                </div>
            </div>
            <div id="category-buttons-container" class="category-buttons-container"></div>
        </div>
    </div>
    
    <div class="content">
        <div class="add-remove-controls">
            <button class="round-btn add-btn" onclick="showAddDialog()" title="添加链接">
                <svg viewBox="0 0 48 48" width="22" height="22"><path d="M16 6H8a2 2 0 0 0-2 2v8M16 42H8a2 2 0 0 1-2-2v-8M32 42h8a2 2 0 0 0 2-2v-8M32 6h8a2 2 0 0 1 2 2v8" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M32 24H16M24 16v16" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
            </button>
            <button class="round-btn remove-btn" onclick="toggleRemoveMode()" title="批量操作">
                <svg viewBox="0 0 48 48" width="22" height="22"><path d="M42 26v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M14 26.72V34h7.32L42 13.31 34.7 6 14 26.72Z" stroke="white" stroke-width="4" stroke-linejoin="round" fill="none"/></svg>
            </button>
            <button class="round-btn category-add-btn" onclick="showAddParentCatDialog()" title="添加一级分类">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
            </button>
            <button class="round-btn category-add-btn" onclick="showAddSubCatDialog()" title="添加二级分类" style="background-color: #f39c12;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </button>
            <button class="round-btn category-manage-btn" onclick="toggleEditCategory()" title="编辑分类">
                <svg viewBox="0 0 48 48" width="22" height="22"><path d="M5 8c0-1.1.9-2 2-2h12l5 6h17c1.1 0 2 .9 2 2v26c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8Z" stroke="white" stroke-width="4" stroke-linejoin="round" fill="none"/><circle cx="24" cy="28" r="4" stroke="white" stroke-width="4" fill="none"/><path d="M24 21v3m0 8v3m4.8-12-2.1 2.1M20.8 31l-2.1 2.1M19 23l2.1 2.1M27 31l2.1 2.1M17 28h3M28 28h3" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
        </div>

        <div id="sections-container"></div>

        <div id="batch-bar" style="display:none;position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(44,62,80,0.95);backdrop-filter:blur(10px);border-radius:12px;padding:10px 20px;z-index:1000;display:none;gap:10px;align-items:center;box-shadow:0 4px 20px rgba(0,0,0,0.3);">
            <span id="batch-count" style="color:#fff;font-size:13px;margin-right:8px;">已选 0 项</span>
            <button onclick="batchMove()" style="background:#43b883;color:#fff;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;">移动到...</button>
            <button onclick="batchDelete()" style="background:#e74c3c;color:#fff;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;">删除所选</button>
            <button onclick="toggleRemoveMode()" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;">退出</button>
        </div>
        
        <div class="floating-button-group">
            <button id="back-to-top-btn" onclick="scrollToTop()" style="display: none;">
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none"><path d="M12 28l12-12 12 12" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button id="theme-toggle" onclick="toggleTheme()">◑</button>
        </div>
        
        <div id="dialog-overlay" class="dialog-overlay" style="display: none;">
            <div id="dialog-box" class="dialog-box">
                <h3 class="dialog-title" id="link-dialog-title">编辑书签</h3>
                <label for="name-input">名称</label>
                <input type="text" id="name-input" placeholder="必填">
                <label for="url-input">地址</label>
                <div style="display:flex;gap:8px;">
                    <input type="text" id="url-input" placeholder="必填 (如 https://...)" style="flex:1;">
                    <button type="button" id="fetch-meta-btn" style="white-space:nowrap;padding:10px 14px;background:#43b883;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;margin-bottom:15px;">获取信息</button>
                </div>
                <label for="tips-input">描述</label>
                <input type="text" id="tips-input" placeholder="可选悬停提示">
                <label for="icon-input">图标</label>
                <input type="text" id="icon-input" placeholder="可选 (图片URL，留空自动抓取)">
                
                <div style="display: flex; gap: 10px;">
                    <div style="flex:1;">
                        <label for="link-parent-category-select">一级分类</label>
                        <select id="link-parent-category-select"></select>
                    </div>
                    <div style="flex:1;">
                        <label for="link-sub-category-select">二级分类</label>
                        <select id="link-sub-category-select"></select>
                    </div>
                </div>

                <div style="display: flex; align-items: center; margin-bottom: 20px; gap: 8px; margin-top: 5px;">
                    <input type="checkbox" id="private-checkbox" style="width: auto; margin:0;">
                    <label for="private-checkbox" style="margin:0; cursor:pointer;">设为私密链接</label>
                </div>
                <div class="dialog-buttons">
                    <button class="dialog-cancel-btn" id="dialog-cancel-btn">取消</button>
                    <button class="dialog-confirm-btn" id="dialog-confirm-btn">保存</button>
                </div>
            </div>
        </div>

        <div id="login-modal" class="login-modal" style="display: none;">
            <div class="login-modal-content">
                <h3 class="dialog-title">安全验证</h3>
                <input type="password" id="login-password" placeholder="请输入管理员密码">
                <div class="login-modal-buttons">
                    <button class="dialog-cancel-btn cancel" onclick="hideLoginModal()">取消</button>
                    <button class="dialog-confirm-btn" onclick="performLogin()">登录</button>
                </div>
            </div>
        </div>

        <div class="dialog-overlay top-z-index" id="custom-alert-overlay" style="display: none;">
            <div class="dialog-box" id="custom-alert-box">
                <h3 class="dialog-title" id="custom-alert-title">提示</h3>
                <div class="dialog-content" id="custom-alert-content"></div>
                <div class="dialog-buttons">
                    <button class="dialog-confirm-btn" id="custom-alert-confirm">确定</button>
                </div>
            </div>
        </div>

        <div class="dialog-overlay top-z-index" id="custom-confirm-overlay" style="display: none;">
            <div class="dialog-box">
                <h3 class="dialog-title">请确认</h3>
                <div class="dialog-content" id="custom-confirm-message"></div>
                <div class="dialog-buttons">
                    <button id="custom-confirm-cancel" class="dialog-cancel-btn">取消</button>
                    <button id="custom-confirm-ok" class="dialog-confirm-btn">确定</button>
                </div>
            </div>
        </div>

        <div class="dialog-overlay" id="simple-input-dialog" style="display: none;">
            <div class="dialog-box">
                <h3 id="simple-input-dialog-title" class="dialog-title">输入</h3>
                <input type="text" id="simple-input-value" placeholder="请输入...">
                <div class="dialog-buttons">
                    <button id="simple-input-cancel" class="dialog-cancel-btn">取消</button>
                    <button id="simple-input-confirm" class="dialog-confirm-btn">确定</button>
                </div>
            </div>
        </div>

        <div class="dialog-overlay" id="sub-cat-dialog" style="display: none;">
            <div class="dialog-box">
                <h3 class="dialog-title">新建二级分类</h3>
                <label>所属一级分类</label>
                <select id="sub-cat-parent-select"></select>
                <label style="margin-top:10px;">二级分类名称</label>
                <input type="text" id="sub-cat-name-input" placeholder="请输入二级分类名称">
                <div class="dialog-buttons">
                    <button id="sub-cat-cancel" class="dialog-cancel-btn">取消</button>
                    <button id="sub-cat-confirm" class="dialog-confirm-btn">确定</button>
                </div>
            </div>
        </div>

        <div id="loading-mask" style="display:none;">
            <div class="loading-content">
                <div class="spinner"></div>
                <p style="margin: 10px 0 0 0; font-weight: 500;">加载中...</p>
            </div>
        </div>
    </div>
    
    <div id="custom-tooltip"></div>

    <div id="copyright">
        <div class="copyright-container">
            <span class="site-title">柒蓝导航</span>
            <p>&copy; 2025 <a href="https://github.com/qilan28/Card-Tab" target="_blank">Card-Tab</a></p>
            <div class="buttons-group">
                <button class="admin-btn" id="admin-btn" style="display: none;">设置</button>
                <button class="login-btn" id="login-btn">登录</button>
            </div>
        </div>
    </div>

    <script>
    /* ---------------- 全局变量与初始化 ---------------- */
    let publicLinks = [];
    let privateLinks = [];
    let isAdmin = false;
    let isLoggedIn = false;
    let removeMode = false;
    let isEditCategoryMode = false;
    let isDarkTheme = false;
    let links = [];
    let categories = {}; 
    let activeCategory = null; 
    let isShowingSearchResults = false;
    let currentEngine = "baidu";

    async function loadHitokoto() {
        try {
            const response = await fetch('https://v1.hitokoto.cn/?encode=text');
            const text = await response.text();
            const el = document.getElementById('hitokoto_text');
            if (el) el.textContent = text;
        } catch (error) {
            const el = document.getElementById('hitokoto_text');
            if (el) el.textContent = '盛年不重来，一日难再晨。';
        }
    }
    loadHitokoto();

    const searchEngines = {
        baidu: "https://www.baidu.com/s?wd=",
        bing: "https://www.bing.com/search?q=",
        google: "https://www.google.com/search?q=",
        duckduckgo: "https://duckduckgo.com/?q="
    };

    function setActiveEngine(engine) {
        currentEngine = engine;
        document.getElementById('search-engine-select').value = engine;
        const searchInput = document.getElementById('search-input');
        searchInput.placeholder = engine === 'in_site' ? '站内搜索书签...' : '搜索全网...';

        if (engine === 'in_site') {
            if (searchInput.value.trim()) filterBookmarksByKeyword(searchInput.value);
        } else {
            if (isShowingSearchResults) hideSearchResults();
        }
    }

    document.getElementById('search-engine-select').addEventListener('change', function() { setActiveEngine(this.value); });
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value.trim();
        if (!query) return;
        if (currentEngine === 'in_site') filterBookmarksByKeyword(query);
        else window.open(searchEngines[currentEngine] + encodeURIComponent(query), '_blank');
    });

    document.getElementById('search-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') document.getElementById('search-button').click(); });
    document.getElementById('search-input').addEventListener('input', (e) => {
        if (currentEngine === 'in_site') {
            e.target.value.trim() ? filterBookmarksByKeyword(e.target.value) : hideSearchResults();
        }
    });

    setActiveEngine(currentEngine);

    /* ---------------- 数据加载与渲染 ---------------- */
    async function loadLinks() {
        const headers = { 'Content-Type': 'application/json' };
        if (isLoggedIn) {
            const token = localStorage.getItem('authToken');
            if (token) headers['Authorization'] = token;
        }
        try {
            const response = await fetch('/api/getLinks?userId=testUser', { headers });
            if (!response.ok) throw new Error("HTTP error! status: " + response.status);
            const data = await response.json();
            
            // 兼容旧格式：categories 里存的是链接对象数组而非子分类名
            if (data.categories) {
                Object.keys(data.categories).forEach(cat => {
                    const val = data.categories[cat];
                    if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'object') {
                        // 旧格式：把嵌在分类里的链接提取到 data.links 中
                        if (!data.links) data.links = [];
                        val.forEach(linkObj => {
                            if (!data.links.some(l => l.url === linkObj.url)) {
                                if (!linkObj.category) linkObj.category = cat;
                                if (!linkObj.subCategory) linkObj.subCategory = '默认分类';
                                data.links.push(linkObj);
                            }
                        });
                    }
                });
            }

            categories = {};
            // 数据结构兼容转换
            if (data.categories) {
                const loadedCats = data.categories;
                Object.keys(loadedCats).forEach(k => {
                    if (Array.isArray(loadedCats[k]) && loadedCats[k].length > 0 && typeof loadedCats[k][0] === 'object') {
                        categories[k] = ['默认分类'];
                    } else if (Array.isArray(loadedCats[k])) {
                        categories[k] = loadedCats[k];
                    } else {
                        categories[k] = ['默认分类'];
                    }
                });
            }

            publicLinks = data.links ? data.links.filter(link => !link.isPrivate) : [];
            privateLinks = data.links ? data.links.filter(link => link.isPrivate) : [];
            links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;
            
            links.forEach(l => {
                if (!l.subCategory) l.subCategory = '默认分类';
                if (!categories[l.category]) categories[l.category] = [];
                if (!categories[l.category].includes(l.subCategory)) categories[l.category].push(l.subCategory);
            });

        } catch (error) {
            console.error('加载链接失败:', error);
        }
    }

    // 联动下拉框更新
    document.getElementById('link-parent-category-select').addEventListener('change', (e) => {
        updateSubCategorySelect(e.target.value);
    });

    function updateLinkCategorySelects(selectedParent = null, selectedSub = null) {
        const pSelect = document.getElementById('link-parent-category-select');
        pSelect.innerHTML = '';
        const pCats = Object.keys(categories);
        
        if (pCats.length === 0) {
            categories['默认分类'] = ['默认分类'];
            pCats.push('默认分类');
        }

        pCats.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c; opt.textContent = c;
            pSelect.appendChild(opt);
        });

        pSelect.value = selectedParent && pCats.includes(selectedParent) ? selectedParent : pCats[0];
        updateSubCategorySelect(pSelect.value, selectedSub);
    }

    function updateSubCategorySelect(parentCat, selectedSub = null) {
        const sSelect = document.getElementById('link-sub-category-select');
        sSelect.innerHTML = '';
        const sCats = categories[parentCat] || [];
        
        if (sCats.length === 0) {
            categories[parentCat] = ['默认分类'];
            sCats.push('默认分类');
        }

        sCats.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c; opt.textContent = c;
            sSelect.appendChild(opt);
        });

        sSelect.value = selectedSub && sCats.includes(selectedSub) ? selectedSub : sCats[0];
    }

    // 渲染页面
    function renderSections() {
        const container = document.getElementById('sections-container');
        container.innerHTML = '';
        
        // 自动选择第一个可展示的一级分类展开
        if (!isAdmin && !activeCategory) {
            const availableCats = Object.keys(categories).filter(pCat => {
                if (isLoggedIn) return true;
                return categories[pCat].some(sCat => {
                    return links.some(l => l.category === pCat && l.subCategory === sCat && !l.isPrivate);
                });
            });
            if (availableCats.length > 0) activeCategory = availableCats[0];
        }

        Object.keys(categories).forEach(pCat => {
            const pSection = document.createElement('div');
            pSection.className = 'parent-section';
            pSection.id = 'parent-' + pCat;
            pSection.dataset.parent = pCat;

            if (isAdmin) {
                const pTitleContainer = document.createElement('div');
                pTitleContainer.className = 'parent-title-container';
                const pTitle = document.createElement('div');
                pTitle.className = 'parent-title';
                pTitle.textContent = pCat;
                pTitleContainer.appendChild(pTitle);
                pSection.appendChild(pTitleContainer);

                const catActions = document.createElement('div');
                catActions.className = 'category-actions';
                catActions.style.cssText = 'display:flex;gap:6px;padding:4px 0;align-items:center;';
                
                const editPBtn = document.createElement('button');
                editPBtn.textContent = '重命名'; editPBtn.className = 'edit-category-btn';
                editPBtn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
                editPBtn.onclick = (e) => { e.stopPropagation(); editParentCategoryName(pCat); };
                catActions.appendChild(editPBtn);

                const delPBtn = document.createElement('button');
                delPBtn.textContent = '删除'; delPBtn.className = 'delete-category-btn';
                delPBtn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
                delPBtn.onclick = (e) => { e.stopPropagation(); deleteParentCategory(pCat); };
                catActions.appendChild(delPBtn);

                const upPBtn = document.createElement('button');
                upPBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6l-6 6h4v6h4v-6h4z"/></svg>';
                upPBtn.className = 'move-category-btn'; upPBtn.style.display = isEditCategoryMode ? 'inline-flex' : 'none';
                upPBtn.onclick = (e) => { e.stopPropagation(); moveParentCategory(pCat, -1); };
                catActions.appendChild(upPBtn);

                const downPBtn = document.createElement('button');
                downPBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18l6-6h-4v-6h-4v6h-4z"/></svg>';
                downPBtn.className = 'move-category-btn'; downPBtn.style.display = isEditCategoryMode ? 'inline-flex' : 'none';
                downPBtn.onclick = (e) => { e.stopPropagation(); moveParentCategory(pCat, 1); };
                catActions.appendChild(downPBtn);

                pSection.appendChild(catActions);
            }

            let pHasVisibleLinks = false;

            categories[pCat].forEach(sCat => {
                const sSection = document.createElement('div');
                sSection.className = 'section';
                sSection.dataset.parent = pCat;
                sSection.dataset.sub = sCat;

                const sTitleContainer = document.createElement('div');
                sTitleContainer.className = 'section-title-container';

                const sTitle = document.createElement('div');
                sTitle.className = 'section-title';
                sTitle.textContent = sCat;
                sTitleContainer.appendChild(sTitle);

                if (isAdmin) {
                    const editSBtn = document.createElement('button');
                    editSBtn.textContent = '重命名'; editSBtn.className = 'edit-category-btn';
                    editSBtn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
                    editSBtn.onclick = (e) => { e.stopPropagation(); editSubCategoryName(pCat, sCat); };
                    sTitleContainer.appendChild(editSBtn);

                    const delSBtn = document.createElement('button');
                    delSBtn.textContent = '删除'; delSBtn.className = 'delete-category-btn';
                    delSBtn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
                    delSBtn.onclick = (e) => { e.stopPropagation(); deleteSubCategory(pCat, sCat); };
                    sTitleContainer.appendChild(delSBtn);

                    const upSBtn = document.createElement('button');
                    upSBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6l-6 6h4v6h4v-6h4z"/></svg>';
                    upSBtn.className = 'move-category-btn'; upSBtn.style.display = isEditCategoryMode ? 'inline-flex' : 'none';
                    upSBtn.onclick = (e) => { e.stopPropagation(); moveSubCategory(pCat, sCat, -1); };
                    sTitleContainer.appendChild(upSBtn);

                    const downSBtn = document.createElement('button');
                    downSBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18l6-6h-4v-6h-4v6h-4z"/></svg>';
                    downSBtn.className = 'move-category-btn'; downSBtn.style.display = isEditCategoryMode ? 'inline-flex' : 'none';
                    downSBtn.onclick = (e) => { e.stopPropagation(); moveSubCategory(pCat, sCat, 1); };
                    sTitleContainer.appendChild(downSBtn);
                }

                const cardContainer = document.createElement('div');
                cardContainer.className = 'card-container';
                cardContainer.id = 'cat-' + pCat + '-' + sCat; 
                cardContainer.dataset.parent = pCat;
                cardContainer.dataset.sub = sCat;

                if (isAdmin || pCat === activeCategory) {
                    links.forEach(l => { if(l.category === pCat && l.subCategory === sCat) createCard(l, cardContainer); });
                    cardContainer.setAttribute('data-loaded', 'true');
                } else {
                    cardContainer.setAttribute('data-loaded', 'false');
                }

                sSection.appendChild(sTitleContainer);
                sSection.appendChild(cardContainer);

                let linkCount = 0, privateCount = 0;
                links.forEach(l => {
                    if (l.category === pCat && l.subCategory === sCat) {
                        linkCount++;
                        if (l.isPrivate) privateCount++;
                    }
                });

                const countSpan = document.createElement('span');
                countSpan.textContent = '(' + linkCount + ')';
                countSpan.style.marginLeft = '10px'; countSpan.style.fontSize = '12px'; countSpan.style.color = '#888';
                sTitleContainer.appendChild(countSpan);

                if (privateCount < linkCount || isLoggedIn || isAdmin) {
                    pHasVisibleLinks = true;
                    pSection.appendChild(sSection);
                }
            });

            if (pHasVisibleLinks || isAdmin || isLoggedIn) {
                pSection.style.display = (isAdmin || pCat === activeCategory) ? 'block' : 'none';
                container.appendChild(pSection);
            }
        });
        
        renderCategoryButtons();
    }

    function createCard(link, container) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('draggable', isAdmin);
        card.dataset.isPrivate = link.isPrivate;
        card.setAttribute('data-url', link.url);
        card.classList.add('status-warning'); 

        card.style.setProperty('--card-index', container.children.length);

        const cardTop = document.createElement('div');
        cardTop.className = 'card-top';

        const icon = document.createElement('img');
        icon.className = 'card-icon';
        const isUsingFavicon = (!link.icon || !link.icon.trim() || !isValidUrl(link.icon));
        const domain = extractDomain(link.url);
        icon.src = isUsingFavicon ? 'https://favicon.im/' + domain : link.icon;
        
        icon.onerror = function() {
            if (isUsingFavicon) card.classList.replace('status-warning', 'status-error');
        };
        icon.onload = function() {
            if (isUsingFavicon) card.classList.replace('status-warning', 'status-ok');
        };
        icon.onerror = function() {
            card.classList.replace('status-warning', 'status-error');
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
        };

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = link.name;
        cardTop.appendChild(icon);
        cardTop.appendChild(title);

        const url = document.createElement('div');
        url.className = 'card-url';
        url.textContent = link.url;

        card.appendChild(cardTop);
        card.appendChild(url);

        const tipsEl = document.createElement('div');
        tipsEl.className = 'card-tips';
        tipsEl.textContent = link.tips || '';
        card.appendChild(tipsEl);

        // 自动获取描述：无描述时异步抓取网站 meta
        if (!link.tips || !link.tips.trim()) {
            setTimeout(async () => {
                try {
                    const resp = await fetch('/api/fetchMeta?url=' + encodeURIComponent(link.url));
                    const data = await resp.json();
                    if (data.description && data.description.trim()) {
                        tipsEl.textContent = data.description;
                        link.tips = data.description; // 同步到原对象
                    }
                } catch (e) { /* ignore */ }
            }, 200);
        }

        if (link.isPrivate) {
            const pTag = document.createElement('div');
            pTag.className = 'private-tag';
            pTag.textContent = '私密';
            card.appendChild(pTag);
        }

        const correctedUrl = link.url.startsWith('http') ? link.url : 'http://' + link.url;
        card.addEventListener('click', (e) => {
            if (removeMode) {
                if (e.target.closest('.card-btn') || e.target.closest('.batch-cb')) return;
                const cb = card.querySelector('.batch-cb');
                if (cb) cb.click();
                return;
            }
            window.open(correctedUrl, '_blank');
        });

        // 批量操作复选框（卡片右下角）
        const batchCb = document.createElement('div');
        batchCb.className = 'card-btn batch-cb';
        batchCb.style.cssText = 'display:none;position:absolute;bottom:0;right:0;width:24px;height:24px;border:2px solid #ccc;background:rgba(255,255,255,0.9);align-items:center;justify-content:center;cursor:pointer;transition:all 0.15s;z-index:5;border-radius:4px;';
        batchCb.dataset.url = link.url;
        batchCb.dataset.checked = 'false';
        batchCb.onclick = (e) => {
            e.stopPropagation();
            const checked = batchCb.dataset.checked === 'true';
            batchCb.dataset.checked = String(!checked);
            if (!checked) {
                batchCb.style.borderColor = '#43b883';
                batchCb.style.background = '#43b883';
                batchCb.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="4 12 10 18 20 6"/></svg>';
            } else {
                batchCb.style.borderColor = '#ccc';
                batchCb.style.background = 'rgba(255,255,255,0.85)';
                batchCb.innerHTML = '';
            }
            updateBatchCount();
        };
        if (removeMode) {
            batchCb.style.display = 'flex';
        }
        card.style.position = 'relative';
        card.appendChild(batchCb);

        const actions = document.createElement('div');
        actions.className = 'card-actions';
        const editBtn = document.createElement('button');
        editBtn.className = 'card-btn edit-btn';
        editBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
        editBtn.onclick = (e) => { e.stopPropagation(); showEditDialog(link); };

        const delBtn = document.createElement('button');
        delBtn.className = 'card-btn delete-btn';
        delBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3,6 5,6 21,6"></polyline><path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path></svg>';
        delBtn.onclick = (e) => { e.stopPropagation(); removeCard(card); };

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);
        card.appendChild(actions);

        // 管理模式：hover 显示编辑/删除按钮；批量删除模式：始终显示
        if (isAdmin && !removeMode) {
            card.addEventListener('mouseenter', () => { editBtn.style.display = 'flex'; delBtn.style.display = 'flex'; });
            card.addEventListener('mouseleave', () => { editBtn.style.display = 'none'; delBtn.style.display = 'none'; });
        }
        if (isAdmin && removeMode) { editBtn.style.display = 'flex'; delBtn.style.display = 'flex'; card.style.cursor='default';}
        
        card.addEventListener('mousemove', (e) => handleTooltipMouseMove(e, link.tips, isAdmin));
        card.addEventListener('mouseleave', handleTooltipMouseLeave);
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragover', dragOver);
        card.addEventListener('dragend', dragEnd);
        card.addEventListener('drop', drop);
        card.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(link.url).then(() => {
                const tt = document.getElementById('custom-tooltip');
                tt.textContent = '✓ 已复制';
                tt.style.display = 'block';
                tt.style.left = e.pageX + 12 + 'px';
                tt.style.top = e.pageY + 12 + 'px';
                setTimeout(() => { tt.style.display = 'none'; }, 1200);
            }).catch(() => {});
        });

        container.appendChild(card);
    }

    function extractDomain(url) { try { return new URL(url).hostname; } catch(e) { return url; } }
    function isValidUrl(url) { try { new URL(url); return true; } catch { return false; } }

    /* ---------------- UI 交互逻辑 ---------------- */
    function loadCategoryCards(pCat) {
        if (activeCategory === pCat && !isAdmin) {
            const currentSection = document.getElementById('parent-' + pCat);
            if (currentSection) currentSection.style.display = 'none';
            activeCategory = null;
            updateActiveCategoryButton(null);
            return;
        }
        
        if (!isAdmin) {
            document.querySelectorAll('.parent-section').forEach(s => s.style.display = 'none');
            const target = document.getElementById('parent-' + pCat);
            if(target) target.style.display = 'block';
        }
        
        // 动态加载内容
        const pSection = document.getElementById('parent-' + pCat);
        if (pSection) {
            const containers = pSection.querySelectorAll('.card-container');
            containers.forEach(container => {
                if (container.getAttribute('data-loaded') !== 'true') {
                    container.innerHTML = '';
                    const sCat = container.dataset.sub;
                    links.forEach(link => { if (link.category === pCat && link.subCategory === sCat) createCard(link, container); });
                    container.setAttribute('data-loaded', 'true');
                }
            });
        }
        
        scrollToCategory(pCat);
        activeCategory = pCat;
        updateActiveCategoryButton(pCat);
    }

    function renderCategoryButtons() {
        if (isShowingSearchResults) return;
        const container = document.getElementById('category-buttons-container');
        container.innerHTML = '';
        const allKeys = Object.keys(categories);
        if (allKeys.length === 0) return container.style.display = 'none';
        
        let count = 0;
        allKeys.forEach(pCat => {
            const hasVisible = categories[pCat].some(sCat => {
                return links.some(l => l.category === pCat && l.subCategory === sCat && (!l.isPrivate || isLoggedIn));
            });
            if (hasVisible || isLoggedIn || isAdmin) {
                const btn = document.createElement('button');
                btn.className = 'category-button';
                btn.textContent = pCat;
                if(pCat === activeCategory) btn.classList.add('active');
                btn.onclick = () => { if(isShowingSearchResults) hideSearchResults(); loadCategoryCards(pCat); };
                container.appendChild(btn);
                count++;
            }
        });
        container.style.display = count > 0 ? 'flex' : 'none';
    }

    function updateActiveCategoryButton(catName) {
        document.querySelectorAll('.category-button').forEach(btn => {
            btn.textContent === catName ? btn.classList.add('active') : btn.classList.remove('active');
        });
    }

    function scrollToCategory(cat) {
        const el = document.getElementById('parent-' + cat);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /* ---------------- 双层分类结构管理核心 ---------------- */
    
    // 自定义通用输入弹窗
    function showSimpleInputDialog(title, def='') {
        return new Promise(res => {
            const d = document.getElementById('simple-input-dialog');
            document.getElementById('simple-input-dialog-title').textContent = title;
            const input = document.getElementById('simple-input-value');
            input.value = def; d.style.display = 'flex'; setTimeout(()=>input.focus(),50);
            document.getElementById('simple-input-confirm').onclick = () => { if(input.value.trim()){ d.style.display='none'; res(input.value.trim()); }};
            document.getElementById('simple-input-cancel').onclick = () => { d.style.display='none'; res(null); };
        });
    }

    async function showAddParentCatDialog() {
        if (!await validateToken()) return;
        const name = await showSimpleInputDialog('新建一级分类');
        if (name && !categories[name]) {
            categories[name] = ['默认分类'];
            try { await saveLinks(); } catch(e) { await loadLinks(); customAlert('保存失败，请重试'); }
            renderSections();
        } else if (categories[name]) customAlert('该分类已存在');
    }

    async function showAddSubCatDialog() {
        if (!await validateToken()) return;
        if (Object.keys(categories).length === 0) return customAlert('请先创建一级分类');
        
        return new Promise(res => {
            const d = document.getElementById('sub-cat-dialog');
            const sel = document.getElementById('sub-cat-parent-select');
            const inp = document.getElementById('sub-cat-name-input');
            
            sel.innerHTML = '';
            Object.keys(categories).forEach(k => {
                const opt = document.createElement('option');
                opt.value = k; opt.textContent = k;
                sel.appendChild(opt);
            });
            inp.value = '';
            d.style.display = 'flex'; setTimeout(()=>inp.focus(),50);

            document.getElementById('sub-cat-confirm').onclick = async () => {
                const pCat = sel.value; const sCat = inp.value.trim();
                if(sCat){
                    if(!categories[pCat].includes(sCat)) {
                        categories[pCat].push(sCat);
                        try { await saveLinks(); } catch(e) { await loadLinks(); customAlert('保存失败，请重试'); }
                        renderSections();
                        d.style.display='none'; res(true); 
                    } else {
                        customAlert('该二级分类已存在');
                    }
                }
            };
            document.getElementById('sub-cat-cancel').onclick = () => { d.style.display='none'; res(null); };
        });
    }

    async function editParentCategoryName(old) {
        if (!await validateToken()) return;
        const name = await showSimpleInputDialog('重命名一级分类', old);
        if (!name || name === old) return;
        if (categories[name]) return customAlert('名称已存在');

        const newCats = {};
        Object.keys(categories).forEach(k => { newCats[k===old?name:k] = categories[k]; });
        Object.keys(categories).forEach(k => delete categories[k]);
        Object.assign(categories, newCats);

        publicLinks.forEach(l => { if(l.category===old) l.category=name; });
        privateLinks.forEach(l => { if(l.category===old) l.category=name; });
        links.forEach(l => { if(l.category===old) l.category=name; });
        if(activeCategory === old) activeCategory = name;
        try { await saveLinks(); } catch(e) { await loadLinks(); customAlert('保存失败，请重试'); }
        renderSections();
    }

    async function editSubCategoryName(pCat, oldSub) {
        if (!await validateToken()) return;
        const name = await showSimpleInputDialog('重命名二级分类', oldSub);
        if (!name || name === oldSub) return;
        if (categories[pCat].includes(name)) return customAlert('名称已存在');

        const idx = categories[pCat].indexOf(oldSub);
        categories[pCat][idx] = name;

        [...publicLinks, ...privateLinks, links].forEach(arr => { arr.forEach(l => { if(l.category===pCat && l.subCategory===oldSub) l.subCategory=name; }); });
        try { await saveLinks(); } catch(e) { await loadLinks(); customAlert('保存失败，请重试'); }
        renderSections();
    }

    async function deleteParentCategory(pCat) {
        if (!await validateToken()) return;
        if (await customConfirm('确定删除一级分类 "'+pCat+'" 及其下所有内容？')) {
            delete categories[pCat];
            links = links.filter(l => l.category !== pCat);
            publicLinks = publicLinks.filter(l => l.category !== pCat);
            privateLinks = privateLinks.filter(l => l.category !== pCat);
            if (activeCategory === pCat) activeCategory = null;
            try { await saveLinks(); } catch(e) { await loadLinks(); customAlert('保存失败，请重试'); }
            renderSections();
        }
    }

    async function deleteSubCategory(pCat, sCat) {
        if (!await validateToken()) return;
        if (await customConfirm('确定删除二级分类 "'+sCat+'" 及其下所有链接？')) {
            categories[pCat] = categories[pCat].filter(s => s !== sCat);
            links = links.filter(l => !(l.category === pCat && l.subCategory === sCat));
            publicLinks = publicLinks.filter(l => !(l.category === pCat && l.subCategory === sCat));
            privateLinks = privateLinks.filter(l => !(l.category === pCat && l.subCategory === sCat));
            try { await saveLinks(); } catch(e) { await loadLinks(); customAlert('保存失败，请重试'); }
            renderSections();
        }
    }

    async function moveParentCategory(cat, dir) {
        if (!await validateToken()) return;
        const keys = Object.keys(categories);
        const idx = keys.indexOf(cat);
        const nIdx = idx + dir;
        if (nIdx < 0 || nIdx >= keys.length) return;

        const newCats = {}; const reordered = [...keys];
        [reordered[idx], reordered[nIdx]] = [reordered[nIdx], reordered[idx]];
        reordered.forEach(k => newCats[k] = categories[k]);
        
        Object.keys(categories).forEach(k => delete categories[k]);
        Object.assign(categories, newCats);
        try { await saveLinks(); } catch(e) { await loadLinks(); customAlert('保存失败，请重试'); }
        renderSections();
    }

    async function moveSubCategory(pCat, sCat, dir) {
        if (!await validateToken()) return;
        const arr = categories[pCat];
        const idx = arr.indexOf(sCat);
        const nIdx = idx + dir;
        if (nIdx < 0 || nIdx >= arr.length) return;
        [arr[idx], arr[nIdx]] = [arr[nIdx], arr[idx]];
        try { await saveLinks(); } catch(e) { await loadLinks(); customAlert('保存失败，请重试'); }
        renderSections();
    }

    function toggleEditCategory() {
        isEditCategoryMode = !isEditCategoryMode;
        document.querySelectorAll('.delete-category-btn, .edit-category-btn, .move-category-btn').forEach(b => b.style.display = isEditCategoryMode ? 'inline-flex' : 'none');
        const btn = document.querySelector('.category-manage-btn');
        isEditCategoryMode ? btn.classList.add('active') : btn.classList.remove('active');
    }

    function toggleRemoveMode() {
        removeMode = !removeMode;
        if (removeMode) {
            document.getElementById('batch-bar').style.display = 'flex';
            document.querySelectorAll('.batch-cb').forEach(cb => {
                cb.dataset.checked = 'false';
                cb.style.borderColor = '#ccc';
                cb.style.background = 'rgba(255,255,255,0.85)';
                cb.innerHTML = '';
            });
            updateBatchCount();
        } else {
            document.getElementById('batch-bar').style.display = 'none';
        }
        document.querySelectorAll('.edit-btn, .delete-btn').forEach(b => b.style.display = removeMode ? 'flex' : 'none');
        document.querySelectorAll('.batch-cb').forEach(b => b.style.display = removeMode ? 'flex' : 'none');
        document.querySelectorAll('.card').forEach(c => c.style.cursor = removeMode ? 'default' : 'pointer');
    }

    function updateBatchCount() {
        const n = document.querySelectorAll('.batch-cb[data-checked="true"]').length;
        document.getElementById('batch-count').textContent = '已选 ' + n + ' 项';
    }

    function getCheckedUrls() {
        return [...document.querySelectorAll('.batch-cb[data-checked="true"]')].map(cb => cb.dataset.url);
    }

    async function batchDelete() {
        if (!await validateToken()) return;
        const urls = getCheckedUrls();
        if (urls.length === 0) return customAlert('请先选择要删除的书签');
        if (!await customConfirm('确定删除选中的 ' + urls.length + ' 个书签？')) return;
        publicLinks = publicLinks.filter(l => !urls.includes(l.url));
        privateLinks = privateLinks.filter(l => !urls.includes(l.url));
        links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;
        try { await saveLinks(); } catch(e) { await loadLinks(); customAlert('保存失败，请重试'); }
        toggleRemoveMode();
        renderSections();
    }

    async function batchMove() {
        if (!await validateToken()) return;
        const urls = getCheckedUrls();
        if (urls.length === 0) return customAlert('请先选择要移动的书签');
        // 弹窗选目标分类
        const d = document.getElementById('simple-input-dialog');
        document.getElementById('simple-input-dialog-title').textContent = '选择目标分类';
        // 构建选择器
        let selHtml = '<div style="margin-bottom:10px;"><label>一级分类</label><select id="batch-target-cat" style="width:100%;padding:8px;border-radius:6px;border:1px solid #ddd;">';
        Object.keys(categories).forEach(c => { selHtml += '<option>' + c + '</option>'; });
        selHtml += '</select></div><div><label>二级分类</label><select id="batch-target-sub" style="width:100%;padding:8px;border-radius:6px;border:1px solid #ddd;"></select></div>';
        document.getElementById('simple-input-value').style.display = 'none';
        const extra = document.createElement('div');
        extra.id = 'batch-move-extra';
        extra.innerHTML = selHtml;
        document.getElementById('simple-input-value').parentNode.insertBefore(extra, document.getElementById('simple-input-value'));
        
        function updateSubs() {
            const p = document.getElementById('batch-target-cat').value;
            const s = document.getElementById('batch-target-sub');
            s.innerHTML = '';
            (categories[p]||[]).forEach(sub => { s.innerHTML += '<option>' + sub + '</option>'; });
        }
        document.getElementById('batch-target-cat').onchange = updateSubs;
        updateSubs();
        
        d.style.display = 'flex';
        document.getElementById('simple-input-confirm').onclick = async () => {
            const targetCat = document.getElementById('batch-target-cat').value;
            const targetSub = document.getElementById('batch-target-sub').value;
            d.style.display = 'none';
            document.getElementById('simple-input-value').style.display = '';
            if (extra.parentNode) extra.parentNode.removeChild(extra);
            // 移动所有选中的链接
            const allLinks = [...publicLinks, ...privateLinks];
            urls.forEach(url => {
                const link = allLinks.find(l => l.url === url);
                if (link) { link.category = targetCat; link.subCategory = targetSub; }
            });
            try { await saveLinks(); } catch(e) { await loadLinks(); customAlert('保存失败，请重试'); }
            toggleRemoveMode();
            renderSections();
        };
        document.getElementById('simple-input-cancel').onclick = () => {
            d.style.display = 'none';
            document.getElementById('simple-input-value').style.display = '';
            if (extra.parentNode) extra.parentNode.removeChild(extra);
        };
    }

    /* ---------------- 对话框控制 ---------------- */
    let currentConfirmHandler = null;

    function showAddDialog() {
        document.getElementById('dialog-overlay').style.display = 'flex';
        document.getElementById('link-dialog-title').innerText='添加书签';
        
        updateLinkCategorySelects();

        ['name-input','url-input','tips-input','icon-input'].forEach(id => document.getElementById(id).value='');
        document.getElementById('private-checkbox').checked = false;
        
        setupDialogEvents(async () => { await addLink(); });
        setTimeout(() => document.getElementById('name-input').focus(), 50);
    }

    function showEditDialog(link) {
        document.getElementById('dialog-overlay').style.display = 'flex';
        document.getElementById('link-dialog-title').innerText='编辑书签';
        
        updateLinkCategorySelects(link.category, link.subCategory);

        document.getElementById('name-input').value = link.name;
        document.getElementById('url-input').value = link.url;
        document.getElementById('tips-input').value = link.tips || '';
        document.getElementById('icon-input').value = link.icon || '';
        document.getElementById('private-checkbox').checked = link.isPrivate;
        
        setupDialogEvents(async () => { await updateLink(link); });
    }

    function setupDialogEvents(confirmAction) {
        const confirmBtn = document.getElementById('dialog-confirm-btn');
        const cancelBtn = document.getElementById('dialog-cancel-btn');
        
        if(currentConfirmHandler) confirmBtn.removeEventListener('click', currentConfirmHandler);
        currentConfirmHandler = async (e) => { e.preventDefault(); await confirmAction(); };
        confirmBtn.addEventListener('click', currentConfirmHandler);
        cancelBtn.onclick = () => document.getElementById('dialog-overlay').style.display = 'none';
    }

    async function fetchSiteMeta() {
        const url = document.getElementById('url-input').value.trim();
        if (!url || !isValidUrl(url.startsWith('http') ? url : 'https://' + url)) {
            customAlert('请先输入有效的网址');
            return;
        }
        const btn = document.getElementById('fetch-meta-btn');
        btn.textContent = '获取中...'; btn.disabled = true;
        try {
            const resp = await fetch('/api/fetchMeta?url=' + encodeURIComponent(url));
            const data = await resp.json();
            if (data.title && !document.getElementById('name-input').value) {
                document.getElementById('name-input').value = data.title;
            }
            if (data.description && !document.getElementById('tips-input').value) {
                document.getElementById('tips-input').value = data.description;
            }
        } catch (e) { /* ignore */ }
        btn.textContent = '获取信息'; btn.disabled = false;
    }

    async function addLink() {
        if (!await validateToken()) return;
        const link = getDialogData();
        if (!link) return;
        
        if ([...publicLinks, ...privateLinks].some(l => l.url.toLowerCase() === link.url.toLowerCase() && l.category === link.category && l.subCategory === link.subCategory)) {
            return customAlert('该分类下已存在此书签');
        }

        link.isPrivate ? privateLinks.push(link) : publicLinks.push(link);
        links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

        try {
            await saveLinks();
            renderSections();
            document.getElementById('dialog-overlay').style.display = 'none';
        } catch(e) {
            await loadLinks(); renderSections();
            customAlert('保存失败，请重试');
        }
    }

    async function updateLink(oldLink) {
        if (!await validateToken()) return;
        const newLink = getDialogData();
        if (!newLink) return;

        if ([...publicLinks, ...privateLinks].some(l => l.url.toLowerCase() === newLink.url.toLowerCase() && l.url !== oldLink.url && l.category === newLink.category && l.subCategory === newLink.subCategory)) {
            return customAlert('该分类下已存在此书签');
        }

        const list = oldLink.isPrivate ? privateLinks : publicLinks;
        const idx = list.findIndex(l => l.url === oldLink.url);
        if(idx>-1) list[idx] = newLink;
        if(oldLink.isPrivate !== newLink.isPrivate) {
             if(oldLink.isPrivate) { privateLinks.splice(idx,1); publicLinks.push(newLink); }
             else { publicLinks.splice(idx,1); privateLinks.push(newLink); }
        }

        links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;
        try {
            await saveLinks(); renderSections();
            document.getElementById('dialog-overlay').style.display = 'none';
        } catch(e) {
            await loadLinks(); renderSections();
            customAlert('保存失败，请重试');
        }
    }

    function getDialogData() {
        const name = document.getElementById('name-input').value.trim();
        const url = document.getElementById('url-input').value.trim();
        const pCat = document.getElementById('link-parent-category-select').value;
        const sCat = document.getElementById('link-sub-category-select').value;

        if(!name || !url || !pCat || !sCat) { customAlert('信息不全'); return null; }
        return {
            name, url,
            tips: document.getElementById('tips-input').value.trim(),
            icon: document.getElementById('icon-input').value.trim(),
            category: pCat, subCategory: sCat,
            isPrivate: document.getElementById('private-checkbox').checked
        };
    }

    async function removeCard(card) {
        if (!await validateToken()) return;
        if (!await customConfirm('确定删除?')) return;
        const url = card.getAttribute('data-url');
        
        links = links.filter(l => l.url !== url);
        publicLinks = publicLinks.filter(l => l.url !== url);
        privateLinks = privateLinks.filter(l => l.url !== url);
        try {
            await saveLinks(); card.remove();
        } catch(e) {
            await loadLinks(); renderSections();
            customAlert('删除失败，请重试');
        }
    }

    /* ---------------- 拖拽逻辑 ---------------- */
    let draggedCard = null;
    function dragStart(e) {
        if(!isAdmin) return e.preventDefault();
        draggedCard = e.target.closest('.card');
        draggedCard.classList.add('dragging');
        e.dataTransfer.effectAllowed = "move";
    }
    function dragOver(e) {
        if(!isAdmin || !draggedCard) return e.preventDefault();
        e.preventDefault();
        const target = e.target.closest('.card');
        if(target && target !== draggedCard) {
            const rect = target.getBoundingClientRect();
            const parent = target.parentNode;
            if(e.clientX < rect.left + rect.width/2) parent.insertBefore(draggedCard, target);
            else parent.insertBefore(draggedCard, target.nextSibling);
        }
    }
    function dragEnd() { if(draggedCard) draggedCard.classList.remove('dragging'); }
    function drop(e) {
        if(!isAdmin || !draggedCard) return e.preventDefault();
        e.preventDefault();
        const container = e.target.closest('.card-container');
        if(!container) { dragEnd(); return; }

        updateCardCat(draggedCard, container);
        saveCardOrder();
        dragEnd();
    }
    function updateCardCat(card, container) {
        const pCat = container.dataset.parent;
        const sCat = container.dataset.sub;
        const url = card.getAttribute('data-url');
        [links, publicLinks, privateLinks].forEach(arr => {
            const item = arr.find(l => l.url === url);
            if(item) { item.category = pCat; item.subCategory = sCat; }
        });
        card.dataset.parent = pCat;
        card.dataset.sub = sCat;
    }

    async function saveCardOrder() {
        if(!await validateToken()) return;
        const parentSections = document.querySelectorAll('.parent-section');
        let np = [], npr = [], nc = {};
        
        parentSections.forEach(pSec => {
            const pCat = pSec.dataset.parent;
            nc[pCat] = [];
            pSec.querySelectorAll('.card-container').forEach(cont => {
                const sCat = cont.dataset.sub;
                nc[pCat].push(sCat);
                [...cont.children].forEach(c => {
                    const url = c.getAttribute('data-url');
                    const isPriv = c.dataset.isPrivate === 'true';
                    const original = links.find(l => l.url === url) || {};
                    const link = { name: c.querySelector('.card-title').textContent, url, tips: original.tips, icon: original.icon, category: pCat, subCategory: sCat, isPrivate: isPriv };
                    isPriv ? npr.push(link) : np.push(link);
                });
            });
        });
        
        publicLinks = np; privateLinks = npr;
        Object.keys(categories).forEach(k => delete categories[k]); Object.assign(categories, nc);
        await saveLinks();
    }

    async function saveLinks() {
        const all = [...publicLinks, ...privateLinks];
        all.forEach(l => { if(!l.status) l.status='ok'; if(!l.lastChecked) l.lastChecked=new Date().toISOString(); });
        const token = localStorage.getItem('authToken');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = token;
        const res = await fetch('/api/saveOrder', { method: 'POST', headers, body: JSON.stringify({ userId: 'testUser', links: all, categories }) });
        if (!res.ok) throw new Error('Save failed: ' + res.status);
    }

    /* ---------------- 其他辅助 ---------------- */
    async function toggleAdminMode() {
        if (!isAdmin && isLoggedIn) {
            if (!await validateToken()) return;
            showLoading();
            try { await fetch('/api/backupData', { method:'POST', headers:{'Authorization':localStorage.getItem('authToken'),'Content-Type':'application/json'}, body:JSON.stringify({sourceUserId:'testUser'})}); } catch(e){}
            isAdmin = true;
            document.querySelector('.add-remove-controls').style.display = 'flex';
            renderSections();
            hideLoading();
        } else if (isAdmin) {
            isAdmin = false; removeMode = false; isEditCategoryMode = false;
            document.querySelector('.add-remove-controls').style.display = 'none';
            document.getElementById('batch-bar').style.display = 'none';
            renderSections();
        }
        updateLoginButton();
    }

    function toggleTheme() { document.body.classList.toggle('dark-theme'); }
    function scrollToTop() { window.scrollTo({top:0, behavior:'smooth'}); }
    window.addEventListener('scroll', () => { document.getElementById('back-to-top-btn').style.display = window.scrollY > 300 ? 'flex' : 'none'; });

    function handleTooltipMouseMove(e, tips, isAdmin) {
        const tt = document.getElementById('custom-tooltip');
        if(!tips || isAdmin) return tt.style.display = 'none';
        tt.textContent = tips; tt.style.display = 'block';
        let left = e.pageX + 15, top = e.pageY + 10;
        if(window.innerWidth - e.clientX < 200) left = e.pageX - tt.offsetWidth - 15;
        if(window.innerHeight - e.clientY < 100) top = e.pageY - tt.offsetHeight - 10;
        tt.style.left = left+'px'; tt.style.top = top+'px';
    }
    function handleTooltipMouseLeave() { document.getElementById('custom-tooltip').style.display = 'none'; }

    function customAlert(msg) {
        return new Promise(res => {
            const overlay = document.getElementById('custom-alert-overlay');
            document.getElementById('custom-alert-content').textContent = msg;
            overlay.style.display = 'flex';
            const btn = document.getElementById('custom-alert-confirm');
            btn.onclick = () => { overlay.style.display = 'none'; res(); };
        });
    }
    function customConfirm(msg) {
        return new Promise(res => {
            const overlay = document.getElementById('custom-confirm-overlay');
            document.getElementById('custom-confirm-message').textContent = msg;
            overlay.style.display = 'flex';
            document.getElementById('custom-confirm-ok').onclick = () => { overlay.style.display='none'; res(true); };
            document.getElementById('custom-confirm-cancel').onclick = () => { overlay.style.display='none'; res(false); };
        });
    }

    function filterBookmarksByKeyword(kw) {
        kw = kw.toLowerCase();
        const matched = links.filter(l => (l.name||'').toLowerCase().includes(kw) || (l.tips||'').toLowerCase().includes(kw) || l.url.toLowerCase().includes(kw));
        const sc = document.getElementById('sections-container');
        sc.innerHTML = '<div class="search-results-header"><div class="search-results-title">搜索结果 ('+matched.length+')</div><button class="back-to-main" onclick="hideSearchResults()">返回</button></div>';
        const cc = document.createElement('div'); cc.className = 'card-container';
        matched.forEach(l => createCard(l, cc));
        sc.appendChild(cc);
        isShowingSearchResults = true;
        document.getElementById('category-buttons-container').style.display = 'none';
    }
    function hideSearchResults() {
        isShowingSearchResults = false;
        document.getElementById('search-input').value = '';
        renderSections();
        if(activeCategory) scrollToCategory(activeCategory);
    }

    async function performLogin() {
        const pwd = document.getElementById('login-password').value;
        if(!pwd) return;
        try {
            const res = await fetch('/api/verifyPassword', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({password:pwd}) });
            const data = await res.json();
            if(data.valid) {
                isLoggedIn = true; localStorage.setItem('authToken', data.token);
                await loadLinks(); renderSections(); document.getElementById('login-modal').style.display='none'; updateLoginButton();
            } else customAlert('密码错误');
        } catch(e) {}
    }
    function hideLoginModal() { document.getElementById('login-modal').style.display='none'; }
    document.getElementById('fetch-meta-btn').onclick = fetchSiteMeta;
    document.getElementById('login-btn').onclick = async () => {
        if(isLoggedIn) { if(await customConfirm('确定退出登录？')) { isLoggedIn=false; isAdmin=false; removeMode=false; localStorage.removeItem('authToken'); links=publicLinks; renderSections(); updateLoginButton(); document.querySelector('.add-remove-controls').style.display='none'; document.getElementById('batch-bar').style.display='none'; } }
        else { document.getElementById('login-modal').style.display='flex'; document.getElementById('login-password').value=''; setTimeout(()=>document.getElementById('login-password').focus(),50); }
    };
    function updateLoginButton() {
        const lBtn = document.getElementById('login-btn'), aBtn = document.getElementById('admin-btn');
        if(isLoggedIn) { lBtn.textContent='退出'; aBtn.style.display='inline-block'; aBtn.textContent = isAdmin?'退出设置':'设置'; }
        else { lBtn.textContent='登录'; aBtn.style.display='none'; }
    }
    async function validateToken() {
        const t = localStorage.getItem('authToken'); if(!t){ isLoggedIn=false; updateLoginButton(); return false; }
        try { const r = await fetch('/api/getLinks?userId=testUser', {headers:{'Authorization':t}}); if(r.status===401){ localStorage.removeItem('authToken'); isLoggedIn=false; return false; } isLoggedIn=true; return true;}catch(e){return false;}
    }

    document.getElementById('admin-btn').onclick = toggleAdminMode;
    function showLoading(){ document.getElementById('loading-mask').style.display='flex'; }
    function hideLoading(){ document.getElementById('loading-mask').style.display='none'; }

    // 初始化
    document.addEventListener('DOMContentLoaded', async () => {
        await validateToken(); 
        updateLoginButton(); 
        await loadLinks(); 
        renderSections();
    });

    </script>
</body>
</html>
`;

// 常量时间比较函数，防止时序攻击
function constantTimeCompare(a, b) {
    if (a.length !== b.length) return false;
    let result = 0;
    for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return result === 0;
}

// 服务端 token 验证
async function validateServerToken(authToken, env) {
    if (!authToken) return { isValid: false, status: 401, response: { error: 'Unauthorized' } };
    try {
        const [timestamp, hash] = authToken.split('.');
        if (Date.now() - parseInt(timestamp) > CONFIG.SESSION_HOURS * 60 * 60 * 1000) return { isValid: false, status: 401 };
        const data = new TextEncoder().encode(timestamp + "_" + env.ADMIN_PASSWORD);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const expectedHash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
        if (!constantTimeCompare(hash, expectedHash)) return { isValid: false, status: 401 };
        return { isValid: true };
    } catch (error) { return { isValid: false, status: 401 }; }
}

export default {
    async fetch(request, env) {
      const url = new URL(request.url);

      if (url.pathname === '/') {
        return new Response(HTML_CONTENT, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
      }

      if (url.pathname === '/api/fetchMeta') {
        const targetUrl = url.searchParams.get('url');
        if (!targetUrl) return new Response(JSON.stringify({ error: 'Missing url' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        try {
            const ctrl = new AbortController();
            const t = setTimeout(() => ctrl.abort(), 5000);
            const resp = await fetch(targetUrl, {
                signal: ctrl.signal,
                redirect: 'follow',
                headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NavMetaBot/1.0)' }
            });
            clearTimeout(t);
            const html = await resp.text();
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
            // 解码 HTML 实体
            const decode = (s) => s.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d))).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
            return new Response(JSON.stringify({
                title: titleMatch ? decode(titleMatch[1].trim()) : '',
                description: descMatch ? decode(descMatch[1].trim()) : ''
            }), { headers: { 'Content-Type': 'application/json' } });
        } catch (e) {
            return new Response(JSON.stringify({ title: '', description: '' }), { headers: { 'Content-Type': 'application/json' } });
        }
      }

      if (url.pathname === '/api/getLinks') {
        const userId = url.searchParams.get('userId');
        const authToken = request.headers.get('Authorization');
        const data = await env.CARD_ORDER.get(userId);

        if (data) {
            const parsedData = JSON.parse(data);
            for (const link of (parsedData.links || [])) if (!link.status) link.status = 'ok';

            // 自动迁移旧格式：categories 里如果存的是链接对象而非子分类名，提取到 links 中
            if (parsedData.categories) {
                let migrated = false;
                Object.keys(parsedData.categories).forEach(cat => {
                    const val = parsedData.categories[cat];
                    if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'object') {
                        migrated = true;
                        val.forEach(linkObj => {
                            if (!parsedData.links) parsedData.links = [];
                            if (!parsedData.links.some(l => l.url === linkObj.url)) {
                                if (!linkObj.category) linkObj.category = cat;
                                if (!linkObj.subCategory) linkObj.subCategory = '默认分类';
                                if (!linkObj.status) linkObj.status = 'ok';
                                parsedData.links.push(linkObj);
                            }
                        });
                        parsedData.categories[cat] = ['默认分类'];
                    }
                });
                if (migrated) {
                    await env.CARD_ORDER.put(userId, JSON.stringify(parsedData));
                }
            }
            
            if (authToken) {
                const validation = await validateServerToken(authToken, env);
                if (!validation.isValid) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

                // 持久防护：从独立 key 恢复被 cron 覆盖的 isPrivate 标志
                if (userId === 'testUser') {
                    try {
                        let privMapRaw = await env.CARD_ORDER.get('private_urls_testUser');
                        // 首次部署时从备份初始化私密链接列表
                        if (!privMapRaw) {
                            const privMap = {};
                            const bl = await env.CARD_ORDER.list({ prefix: 'backup_' });
                            for (const k of (bl.keys || [])) {
                                try {
                                    const bd = await env.CARD_ORDER.get(k.name);
                                    if (bd) (JSON.parse(bd).links || []).filter(l => l.isPrivate).forEach(l => { privMap[l.url] = true; });
                                } catch (e) { /* skip */ }
                            }
                            if (Object.keys(privMap).length > 0) {
                                await env.CARD_ORDER.put('private_urls_testUser', JSON.stringify(privMap));
                                privMapRaw = JSON.stringify(privMap);
                            }
                        }
                        if (privMapRaw) {
                            const privMap = JSON.parse(privMapRaw);
                            let repaired = false;
                            for (const link of parsedData.links) {
                                if (!link.isPrivate && privMap[link.url]) {
                                    link.isPrivate = true;
                                    repaired = true;
                                }
                            }
                            if (repaired) {
                                await env.CARD_ORDER.put(userId, JSON.stringify(parsedData));
                            }
                        }
                    } catch (e) { /* 修复失败不影响正常使用 */ }
                }

                return new Response(JSON.stringify(parsedData), { headers: { 'Content-Type': 'application/json' } });
            }

            const filteredLinks = parsedData.links.filter(link => !link.isPrivate);
            const filteredCategories = {};
            Object.keys(parsedData.categories).forEach(cat => {
                filteredCategories[cat] = parsedData.categories[cat]; // 返回二级分类列表，私密控制由前端渲染负责
            });

            return new Response(JSON.stringify({ links: filteredLinks, categories: filteredCategories }), { headers: { 'Content-Type': 'application/json' } });
        }
        return new Response(JSON.stringify({ links: [], categories: {} }), { headers: { 'Content-Type': 'application/json' } });
      }

      if (url.pathname === '/api/saveOrder' && request.method === 'POST') {
        const validation = await validateServerToken(request.headers.get('Authorization'), env);
        if (!validation.isValid) return new Response('Unauthorized', { status: 401 });

        try {
            const { userId, links, categories } = await request.json();
            for (const link of links) { if (!link.status) { link.status = 'ok'; link.lastChecked = new Date().toISOString(); } }
            await env.CARD_ORDER.put(userId, JSON.stringify({ links, categories, lastStatusCheck: Date.now() }));

            // 持久化私密链接 URL 列表（累积合并，防止被覆盖清空）
            const privateKey = 'private_urls_' + userId;
            let privMap = {};
            try {
                const oldPriv = await env.CARD_ORDER.get(privateKey);
                if (oldPriv) privMap = JSON.parse(oldPriv);
            } catch (e) { /* ignore */ }
            links.filter(l => l.isPrivate).forEach(l => { privMap[l.url] = true; });
            await env.CARD_ORDER.put(privateKey, JSON.stringify(privMap));

            return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
        } catch (error) {
            return new Response(JSON.stringify({ success: false }), { status: 500 });
        }
      }

      if (url.pathname === '/api/verifyPassword' && request.method === 'POST') {
        try {
            const { password } = await request.json();
            if (password === env.ADMIN_PASSWORD) {
                const timestamp = Date.now();
                const data = new TextEncoder().encode(timestamp + "_" + env.ADMIN_PASSWORD);
                const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                const token = timestamp + "." + btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
                return new Response(JSON.stringify({ valid: true, token }), { headers: { 'Content-Type': 'application/json' } });
            }
            return new Response(JSON.stringify({ valid: false }), { status: 403 });
        } catch (error) { return new Response('Error', { status: 500 }); }
      }

      if (url.pathname === '/api/backupData' && request.method === 'POST') {
        const validation = await validateServerToken(request.headers.get('Authorization'), env);
        if (!validation.isValid) return new Response('Unauthorized', { status: 401 });
        try {
            const { sourceUserId } = await request.json();
            const sourceData = await env.CARD_ORDER.get(sourceUserId);
            if (sourceData) {
                const backupId = `backup_${Date.now()}`;
                await env.CARD_ORDER.put(backupId, sourceData);

                // 只保留最近 5 个备份，删除旧的
                try {
                    const list = await env.CARD_ORDER.list({ prefix: 'backup_' });
                    const backups = (list.keys || []).map(k => k.name).filter(n => n.startsWith('backup_'));
                    backups.sort((a, b) => {
                        const ta = parseInt(a.replace('backup_', '')) || 0;
                        const tb = parseInt(b.replace('backup_', '')) || 0;
                        return tb - ta; // 降序，最新的在前
                    });
                    const toDelete = backups.slice(5); // 保留前5个，删除其余
                    for (const key of toDelete) {
                        await env.CARD_ORDER.delete(key);
                    }
                } catch (e) { /* 清理失败不影响备份 */ }

                return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
            }
        } catch (error) { return new Response('Error', { status: 500 }); }
      }

      return new Response('Not Found', { status: 404 });
    },

    // 定时安全网：每 10 分钟修复一次可能被 cron worker 覆盖的 isPrivate 标志
    async scheduled(event, env) {
        const userId = 'testUser';
        try {
            const privMapRaw = await env.CARD_ORDER.get('private_urls_' + userId);
            if (!privMapRaw) return;
            const privMap = JSON.parse(privMapRaw);

            const data = await env.CARD_ORDER.get(userId);
            if (!data) return;
            const parsedData = JSON.parse(data);
            if (!parsedData.links) return;

            let repaired = false;
            for (const link of parsedData.links) {
                if (!link.isPrivate && privMap[link.url]) {
                    link.isPrivate = true;
                    repaired = true;
                }
            }
            if (repaired) {
                await env.CARD_ORDER.put(userId, JSON.stringify(parsedData));
            }
        } catch (e) { /* 静默失败 */ }
    }
};
