const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>柒蓝个人导航页</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>⭐</text></svg>">
    <style>
    /* 全局样式 */
    html, body {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        scroll-behavior: smooth;
    }
    
    body {
        font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #121418;
        color: #222;
        transition: all 0.4s ease;
        background-image: url('https://api.tomys.top/api/acgimg');
        background-size: cover;
        background-position: center top;
        background-attachment: fixed;
        background-repeat: no-repeat;
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

    /* ---------------- PC端固定顶部 ---------------- */
    .fixed-elements {
        position: fixed;
        top: 0; left: 0; right: 0;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
        z-index: 1000;
        padding: 10px;
        height: 160px;
        pointer-events: none;
    }
    .center-content { pointer-events: auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; text-align: center; padding: 0 10px; }
    body.dark-theme .fixed-elements { background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%); }
    .fixed-elements h3 { display: none; }

    /* 一言模块 */
    #hitokoto {
        margin: 5px 0 20px; font-size: 15px; color: #fff; font-style: italic; max-width: 600px;
        margin-left: auto; margin-right: auto; text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6); letter-spacing: 0.5px;
    }
    #hitokoto span { color: #4dffb8; text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8); }
    body.dark-theme #hitokoto { color: #f1f2f6; text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8); }
    body.dark-theme #hitokoto span { color: #7ba1e9; }

    /* 搜索栏样式 - 现代毛玻璃胶囊 */
    .search-container { margin-top: 10px; display: flex; flex-direction: column; align-items: center; width: 100%; }
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
    .search-bar input { flex: 1; border: none; padding: 12px 20px; font-size: 15px; background-color: transparent; outline: none; color: #333; }
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
    .category-buttons-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; padding: 5px 12px; width: 100%; max-width: 1200px; margin: 5px auto 0; position: relative; }
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
        margin-top: 180px; /* PC端对应 fixed header 的高度 */
        padding: 10px; max-width: 1600px; margin-left: auto; margin-right: auto;
        transition: opacity 0.3s ease; padding-bottom: 60px;
    }
    .loading .content { opacity: 0.6; }

    /* 分类标题样式 */
    .section { margin-bottom: 35px; padding: 0 15px; }
    .section-title-container {
        display: flex; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 10px; transition: border-color 0.3s ease; width: 100%; max-width: 1520px; margin-left: auto; margin-right: auto;
    }
    body.dark-theme .section-title-container { border-bottom-color: rgba(255, 255, 255, 0.05); }
    .section-title { font-size: 22px; font-weight: 600; color: #ffffff; position: relative; padding-left: 18px; transition: color 0.3s ease; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); }
    .section-title:before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 6px; height: 22px; background-color: #43b883; border-radius: 4px; box-shadow: 0 0 8px rgba(67, 184, 131, 0.5); }
    body.dark-theme .section-title:before { background-color: #5d7fb9; box-shadow: 0 0 8px rgba(93, 127, 185, 0.5);}

    /* 书签卡片样式 - 高级毛玻璃 */
    .card-container { display: grid; grid-template-columns: repeat(auto-fit, 160px); column-gap: 25px; row-gap: 20px; justify-content: start; padding: 10px 15px 10px 45px; margin: 0 auto; max-width: 1600px; }
    .card {
        background-color: rgba(255, 255, 255, 0.85); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 12px; padding: 14px; width: 160px; box-sizing: border-box;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); cursor: pointer; transition: all 0.3s ease; position: relative; user-select: none;
        border-left: 4px solid #43b883; animation: fadeIn 0.4s ease forwards; animation-delay: calc(var(--card-index) * 0.03s); opacity: 0;
    }
    .card.status-ok { border-left-color: #43b883; } .card.status-error { border-left-color: #e74c3c; } .card.status-warning { border-left-color: #9b59b6; }
    body.dark-theme .card { background-color: rgba(30, 33, 40, 0.75); border-color: rgba(255, 255, 255, 0.05); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
    .card:hover { transform: translateY(-6px); box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1); background-color: rgba(255, 255, 255, 0.95); }
    body.dark-theme .card:hover { background-color: rgba(45, 50, 60, 0.9); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4); }

    .card.dragging { opacity: 0.8; transform: scale(1.05) !important; box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important; border: 2px dashed #43b883; z-index: 100; }
    body.dark-theme .card.dragging { border-color: #5d7fb9; }
    .card-top { display: flex; align-items: center; margin-bottom: 8px; }
    .card-icon { width: 18px; height: 18px; margin-right: 8px; border-radius: 3px; }
    .card-title { font-size: 15px; font-weight: 600; color: #2c3e50; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .card-url { font-size: 12px; color: #95a5a6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    body.dark-theme .card-title { color: #f1f2f6; } body.dark-theme .card-url { color: #a4b0be; }

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
    .add-btn { order: 1; } .remove-btn { order: 2; } .category-add-btn { order: 3; } .category-manage-btn { order: 4; }
    .category-manage-btn.active { background-color: #e74c3c; box-shadow: 0 4px 15px rgba(231, 76, 60, 0.35);}
    .category-manage-btn.active:hover { background-color: #c0392b; box-shadow: 0 6px 20px rgba(231, 76, 60, 0.5);}

    .floating-button-group { position: fixed; bottom: 50px; right: 25px; display: flex; flex-direction: column; gap: 15px; z-index: 1000; }
    .floating-button-group button { width: 46px; height: 46px; border-radius: 50%; font-size: 20px; display: flex; align-items: center; justify-content: center; background-color: #43b883; color: white; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(67, 184, 131, 0.35); transition: all 0.3s; }
    .floating-button-group button:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 6px 20px rgba(67, 184, 131, 0.5); }
    body.dark-theme .floating-button-group button { background-color: #5d7fb9; box-shadow: 0 4px 15px rgba(93, 127, 185, 0.35); }
    body.dark-theme .floating-button-group button:hover { box-shadow: 0 6px 20px rgba(93, 127, 185, 0.5); }

    /* 弹窗样式 - 高级圆角模糊 */
    .dialog-overlay, .login-modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); backdrop-filter: blur(5px); justify-content: center; align-items: center; z-index: 2000; }
    .dialog-box, .login-modal-content { background-color: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.6); padding: 30px; border-radius: 16px; width: 360px; box-sizing: border-box; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2); animation: dialogFadeIn 0.3s ease; }
    body.dark-theme .dialog-box, body.dark-theme .login-modal-content { background-color: rgba(30, 33, 40, 0.95); border-color: rgba(255,255,255,0.1); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); color: #e3e3e3; }
    @keyframes dialogFadeIn { from { opacity: 0; transform: translateY(-30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
    .dialog-title, .login-modal h3 { margin: 0 0 20px 0; color: #333; font-size: 20px; font-weight: 600;}
    body.dark-theme .dialog-title, body.dark-theme .login-modal h3 { color: #f1f2f6; }
    .dialog-box input[type="text"], .dialog-box select, .login-modal input { width: 100%; margin-bottom: 18px; padding: 12px 14px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; transition: all 0.3s; box-sizing: border-box; background-color: rgba(250,250,250,0.8); }
    .dialog-box input:focus, .dialog-box select:focus, .login-modal input:focus { border-color: #43b883; box-shadow: 0 0 0 3px rgba(67, 184, 131, 0.2); outline: none; background-color: #fff; }
    body.dark-theme .dialog-box input[type="text"], body.dark-theme .dialog-box select, body.dark-theme .login-modal input { background-color: rgba(20, 22, 28, 0.8); border-color: #444; color: #e3e3e3; }
    body.dark-theme .dialog-box input:focus, body.dark-theme .dialog-box select:focus { border-color: #5d7fb9; box-shadow: 0 0 0 3px rgba(93, 127, 185, 0.3); background-color: #1a1c23; }
    .dialog-box label { display: block; margin-bottom: 6px; font-weight: 500; color: #555; font-size: 13px;}
    body.dark-theme .dialog-box label { color: #a4b0be; }
    .dialog-buttons, .login-modal-buttons { display: flex; justify-content: flex-end; gap: 12px; margin-top: 5px;}
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
    #loading-mask { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); backdrop-filter: blur(5px); z-index: 7000; display: flex; align-items: center; justify-content: center; }
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

    /* ==================================================
       ❗❗❗ 终极移动端布局修复 (解决卡片遮挡与错位) ❗❗❗
       ================================================== */
    @media (max-width: 768px) {
        .card-container { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; }
    }

    @media (max-width: 480px) {
        /* 核心修复 1: 弃用 position: fixed 换用 position: sticky */
        /* 这样搜索栏和按钮会保留在文档流中，自动推开下方卡片，绝不遮挡！ */
        .fixed-elements { 
            position: sticky; 
            top: 0; 
            padding: 10px 10px 5px 10px; 
            height: auto; 
            min-height: auto; 
            z-index: 1000;
        }
        
        /* 核心修复 2: 恢复普通流，取消绝对定位居中 */
        .center-content { 
            position: static; 
            transform: none; 
            padding-top: 5px; 
        }
        
        /* 核心修复 3: 因为上面的 sticky 已经在正常流里了，这里只需留很小的边距 */
        .content { 
            margin-top: 15px !important; 
            padding-bottom: 60px; 
        }
        
        /* 确保移动端分类标题永远显示 */
        .section-title-container {
            display: flex !important;
            margin-bottom: 15px;
        }
        
        /* UI细节适配缩放 */
        .search-bar { max-width: 95%; border-radius: 25px; margin-bottom: 10px; }
        .search-bar select { width: 90px; padding: 10px 5px 10px 12px; font-size: 13px; }
        .search-bar input { padding: 10px 15px; font-size: 14px; }
        .search-bar button { padding: 0 15px; font-size: 16px; }
        
        .category-buttons-container { flex-wrap: nowrap; overflow-x: auto; justify-content: flex-start; margin-top: 5px; padding: 5px; }
        .category-button { padding: 5px 12px; font-size: 12px; }
        
        .card-container { grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 10px; }
        .card { width: auto; max-width: 100%; padding: 12px; border-radius: 10px;}
        
        .round-btn { width: 40px; height: 40px; font-size: 18px; }
        .floating-button-group button { width: 40px; height: 40px; font-size: 16px; }
        .dialog-box, .login-modal-content { width: 90%; padding: 20px; }
        .section-title { font-size: 18px; padding-left: 14px; }
        .section-title:before { width: 5px; height: 18px; }
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
            <button class="round-btn remove-btn" onclick="toggleRemoveMode()" title="编辑链接">
                <svg viewBox="0 0 48 48" width="22" height="22"><path d="M42 26v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M14 26.72V34h7.32L42 13.31 34.7 6 14 26.72Z" stroke="white" stroke-width="4" stroke-linejoin="round" fill="none"/></svg>
            </button>
            <button class="round-btn category-add-btn" onclick="addCategory()" title="添加分类">
                <svg viewBox="0 0 48 48" width="22" height="22"><path d="M5 8c0-1.1.9-2 2-2h12l5 6h17c1.1 0 2 .9 2 2v26c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8Z" stroke="white" stroke-width="4" stroke-linejoin="round" fill="none"/><path d="M18 27h12M24 21v12" stroke="white" stroke-width="4" stroke-linecap="round"/></svg>
            </button>
            <button class="round-btn category-manage-btn" onclick="toggleEditCategory()" title="编辑分类">
                <svg viewBox="0 0 48 48" width="22" height="22"><path d="M5 8c0-1.1.9-2 2-2h12l5 6h17c1.1 0 2 .9 2 2v26c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8Z" stroke="white" stroke-width="4" stroke-linejoin="round" fill="none"/><circle cx="24" cy="28" r="4" stroke="white" stroke-width="4" fill="none"/><path d="M24 21v3m0 8v3m4.8-12-2.1 2.1M20.8 31l-2.1 2.1M19 23l2.1 2.1M27 31l2.1 2.1M17 28h3M28 28h3" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
        </div>

        <div id="sections-container"></div>
        
        <div class="floating-button-group">
            <button id="back-to-top-btn" onclick="scrollToTop()" style="display: none;">
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none"><path d="M12 28l12-12 12 12" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button id="theme-toggle" onclick="toggleTheme()">◑</button>
        </div>
        
        <!-- 弹窗部分 -->
        <div id="dialog-overlay" class="dialog-overlay" style="display: none;">
            <div id="dialog-box" class="dialog-box">
                <h3 class="dialog-title" id="link-dialog-title">编辑书签</h3>
                <label for="name-input">名称</label>
                <input type="text" id="name-input" placeholder="必填">
                <label for="url-input">地址</label>
                <input type="text" id="url-input" placeholder="必填 (如 https://...)">
                <label for="tips-input">描述</label>
                <input type="text" id="tips-input" placeholder="可选悬停提示">
                <label for="icon-input">图标</label>
                <input type="text" id="icon-input" placeholder="可选 (图片URL，留空自动抓取)">
                <label for="category-select">选择分类</label>
                <select id="category-select"></select>
                <div style="display: flex; align-items: center; margin-bottom: 20px; gap: 8px; margin-top: 5px;">
                    <input type="checkbox" id="private-checkbox" style="width: auto; margin:0;">
                    <label for="private-checkbox" style="margin:0; cursor:pointer;">设为私密链接 (仅登录可见)</label>
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

        <div class="dialog-overlay" id="category-dialog" style="display: none;">
            <div class="dialog-box">
                <h3 id="category-dialog-title" class="dialog-title">新建分类</h3>
                <input type="text" id="category-name-input" placeholder="请输入分类名称">
                <div class="dialog-buttons">
                    <button id="category-cancel-btn" class="dialog-cancel-btn">取消</button>
                    <button id="category-confirm-btn" class="dialog-confirm-btn">确定</button>
                </div>
            </div>
        </div>

        <div id="loading-mask" style="display:none;">
            <div class="loading-content" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(5px); border-radius: 12px; padding: 20px 30px;">
                <div class="spinner"></div>
                <p style="margin: 10px 0 0 0; font-weight: 500;">加载中...</p>
            </div>
        </div>
    </div>
    
    <div id="custom-tooltip"></div>

    <div id="copyright">
        <div class="copyright-container" style="display: flex; align-items: center; justify-content: center; width: 100%; gap: 15px;">
            <span class="site-title">柒蓝导航</span>
            <p>&copy; 2025 <a href="https://github.com/qilan28/Card-Tab" target="_blank">Card-Tab</a></p>
            <div class="buttons-group" style="display: flex; gap: 8px;">
                <button class="admin-btn" id="admin-btn" style="display: none; padding: 4px 10px; border-radius: 12px; font-size: 12px; border:none; background:rgba(255,255,255,0.2); color:#fff; cursor:pointer;">设置</button>
                <button class="login-btn" id="login-btn" style="padding: 4px 10px; border-radius: 12px; font-size: 12px; border:none; background:rgba(67, 184, 131, 0.8); color:#fff; cursor:pointer;">登录</button>
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
    const categories = {};
    let activeCategory = null;
    let isShowingSearchResults = false;
    let currentEngine = "baidu";

    // 一言加载
    async function loadHitokoto() {
        try {
            const response = await fetch('https://v1.hitokoto.cn/?encode=text');
            const text = await response.text();
            const el = document.getElementById('hitokoto_text');
            if (el) el.textContent = text;
        } catch (error) {
            const el = document.getElementById('hitokoto_text');
            if (el) el.textContent = '山不在高，有仙则名。水不在深，有龙则灵。';
        }
    }
    loadHitokoto();

    // 搜索引擎配置
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
            
            if (data.categories) Object.assign(categories, data.categories);
            publicLinks = data.links ? data.links.filter(link => !link.isPrivate) : [];
            privateLinks = data.links ? data.links.filter(link => link.isPrivate) : [];
            links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;
            
            // ❗ 强制反向提取分类：以防 categories 数据丢失，根据现有书签重建分类名
            links.forEach(l => {
                if (l.category && !categories[l.category]) {
                    categories[l.category] = [];
                }
            });

        } catch (error) {
            console.error('加载链接失败:', error);
        }
    }

    function renderSections() {
        const container = document.getElementById('sections-container');
        container.innerHTML = '';
        
        // ❗ 核心修复：自动选中第一个有内容的分类，防止“默认什么都没有”
        if (!isAdmin && !activeCategory) {
            const availableCats = Object.keys(categories).filter(cat => {
                return links.some(l => l.category === cat && (!l.isPrivate || isLoggedIn));
            });
            if (availableCats.length > 0) {
                activeCategory = availableCats[0];
            }
        }

        Object.keys(categories).forEach(category => {
            const section = document.createElement('div');
            section.className = 'section';
            section.setAttribute('data-category', category);

            const titleContainer = document.createElement('div');
            titleContainer.className = 'section-title-container';

            const title = document.createElement('div');
            title.className = 'section-title';
            title.textContent = category;
            titleContainer.appendChild(title);

            if (isAdmin) {
                const editBtn = document.createElement('button');
                editBtn.textContent = '重命名';
                editBtn.className = 'edit-category-btn';
                editBtn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
                editBtn.onclick = (e) => { e.stopPropagation(); editCategoryName(category); };
                titleContainer.appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '删除';
                deleteBtn.className = 'delete-category-btn';
                deleteBtn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
                deleteBtn.onclick = (e) => { e.stopPropagation(); deleteCategory(category); };
                titleContainer.appendChild(deleteBtn);

                const upBtn = document.createElement('button');
                upBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6l-6 6h4v6h4v-6h4z"/></svg>';
                upBtn.className = 'move-category-btn';
                upBtn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
                upBtn.onclick = (e) => { e.stopPropagation(); moveCategory(category, -1); };
                titleContainer.appendChild(upBtn);

                const downBtn = document.createElement('button');
                downBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18l6-6h-4v-6h-4v6h-4z"/></svg>';
                downBtn.className = 'move-category-btn';
                downBtn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
                downBtn.onclick = (e) => { e.stopPropagation(); moveCategory(category, 1); };
                titleContainer.appendChild(downBtn);
            }

            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';
            cardContainer.id = category;
            
            // 如果是管理员模式或当前是激活的分类，则渲染内部卡片
            if (isAdmin || category === activeCategory) {
                links.forEach(link => { if (link.category === category) createCard(link, cardContainer); });
                cardContainer.setAttribute('data-loaded', 'true');
            } else {
                cardContainer.setAttribute('data-loaded', 'false');
            }

            section.appendChild(titleContainer);
            section.appendChild(cardContainer);

            let privateCount = 0, linkCount = 0;
            links.forEach(link => {
                if (link.category === category) {
                    if (link.isPrivate) privateCount++;
                    linkCount++;
                }
            });

            const countSpan = document.createElement('span');
            countSpan.textContent = '(' + linkCount + ')';
            countSpan.style.marginLeft = '10px';
            countSpan.style.fontSize = '14px';
            countSpan.style.color = '#888';
            titleContainer.appendChild(countSpan);
            
            titleContainer.style.cursor = 'pointer';
            titleContainer.addEventListener('click', () => loadCategoryCards(category));

            if (privateCount < linkCount || isLoggedIn) {
                section.style.display = (isAdmin || category === activeCategory) ? 'block' : 'none';
                container.appendChild(section);
            }
        });
        
        renderCategoryButtons();
        updateCategorySelect(); // 同步刷新下拉框
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
        icon.src = isUsingFavicon ? 'https://www.faviconextractor.com/favicon/' + domain : link.icon;
        
        icon.onload = function() {
            if (isUsingFavicon) {
                setTimeout(() => {
                    if (this.naturalWidth === 100 && this.naturalHeight === 100) {
                        card.classList.replace('status-warning', 'status-error');
                    } else {
                        card.classList.replace('status-warning', 'status-ok');
                    }
                }, 50);
            }
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

        if (link.isPrivate) {
            const pTag = document.createElement('div');
            pTag.className = 'private-tag';
            pTag.textContent = '私密';
            card.appendChild(pTag);
        }

        const correctedUrl = link.url.startsWith('http') ? link.url : 'http://' + link.url;
        if (!isAdmin) {
            card.addEventListener('click', () => window.open(correctedUrl, '_blank'));
        }

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

        if (isAdmin && removeMode) { editBtn.style.display = 'flex'; delBtn.style.display = 'flex'; card.style.cursor='default';}
        
        card.addEventListener('mousemove', (e) => handleTooltipMouseMove(e, link.tips, isAdmin));
        card.addEventListener('mouseleave', handleTooltipMouseLeave);
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragover', dragOver);
        card.addEventListener('dragend', dragEnd);
        card.addEventListener('drop', drop);

        container.appendChild(card);
    }

    function extractDomain(url) { try { return new URL(url).hostname; } catch(e) { return url; } }
    function isValidUrl(url) { try { new URL(url); return true; } catch { return false; } }

    /* ---------------- UI 交互逻辑 ---------------- */
    function loadCategoryCards(category) {
        if (activeCategory === category && !isAdmin) {
            document.querySelector('.section[data-category="' + category + '"]').style.display = 'none';
            activeCategory = null;
            updateActiveCategoryButton(null);
            return;
        }
        
        if (!isAdmin) {
            document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
            const target = document.querySelector('.section[data-category="' + category + '"]');
            if(target) target.style.display = 'block';
        }
        
        const container = document.getElementById(category);
        if (container && container.getAttribute('data-loaded') !== 'true') {
            container.innerHTML = '';
            links.forEach(link => { if (link.category === category) createCard(link, container); });
            container.setAttribute('data-loaded', 'true');
        }
        
        scrollToCategory(category);
        activeCategory = category;
        updateActiveCategoryButton(category);
    }

    function renderCategoryButtons() {
        if (isShowingSearchResults) return;
        const container = document.getElementById('category-buttons-container');
        container.innerHTML = '';
        const allKeys = Object.keys(categories);
        if (allKeys.length === 0) return container.style.display = 'none';
        
        let count = 0;
        allKeys.forEach(cat => {
            const vLinks = links.filter(l => l.category === cat && (!l.isPrivate || isLoggedIn));
            if (vLinks.length > 0) {
                const btn = document.createElement('button');
                btn.className = 'category-button';
                btn.textContent = cat;
                if(cat === activeCategory) btn.classList.add('active');
                btn.onclick = () => { if(isShowingSearchResults) hideSearchResults(); loadCategoryCards(cat); };
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
        const el = document.getElementById(cat);
        if (el) {
            const offset = window.innerWidth <= 480 ? 140 : 200;
            window.scrollTo({ top: window.pageYOffset + el.getBoundingClientRect().top - offset, behavior: 'smooth' });
        }
    }

    // ❗ 终极修复：下拉框为空及内容不同步的问题
    function updateCategorySelect(selectedCat = null) {
        const categorySelect = document.getElementById('category-select');
        if (!categorySelect) return;
        
        // 再次强制补全分类字典 (防止因各种原因导致categories对象漏了某个已有的类)
        links.forEach(l => {
            if (l.category && !categories[l.category]) {
                categories[l.category] = [];
            }
        });

        let allCats = Object.keys(categories);
        
        // 兜底：如果此时还是没任何分类，提供一个初始分类名防止无法添加新书签
        if (allCats.length === 0) {
            categories['默认分类'] = [];
            allCats = ['默认分类'];
        }

        categorySelect.innerHTML = '';
        allCats.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
        
        // 应用选中状态
        if (selectedCat && allCats.includes(selectedCat)) {
            categorySelect.value = selectedCat;
        } else if (allCats.length > 0) {
            categorySelect.value = allCats[0];
        }
    }

    /* ---------------- 分类与链接管理 ---------------- */
    async function addCategory() {
        if (!await validateToken()) return;
        const name = await showCategoryDialog('请输入新分类名称');
        if (name && !categories[name]) {
            categories[name] = [];
            renderSections(); saveLinks();
        } else if (categories[name]) customAlert('该分类已存在');
    }

    async function deleteCategory(cat) {
        if (!await validateToken()) return;
        if (await customConfirm('确定删除 "'+cat+'" 及其下所有链接？')) {
            delete categories[cat];
            links = links.filter(l => l.category !== cat);
            publicLinks = publicLinks.filter(l => l.category !== cat);
            privateLinks = privateLinks.filter(l => l.category !== cat);
            renderSections(); saveLinks();
        }
    }

    async function editCategoryName(old) {
        if (!await validateToken()) return;
        const name = await showCategoryDialog('请输入新分类名称', old);
        if (!name || name === old) return;
        if (categories[name]) return customAlert('名称已存在');

        const newCats = {};
        Object.keys(categories).forEach(k => { newCats[k===old?name:k] = categories[k]; });
        Object.keys(categories).forEach(k => delete categories[k]);
        Object.assign(categories, newCats);

        [...publicLinks, ...privateLinks, ...links].forEach(l => { if(l.category===old) l.category=name; });
        renderSections(); saveLinks();
    }

    async function moveCategory(cat, dir) {
        if (!await validateToken()) return;
        const keys = Object.keys(categories);
        const idx = keys.indexOf(cat);
        const nIdx = idx + dir;
        if (nIdx < 0 || nIdx >= keys.length) return;

        const newCats = {};
        const reordered = [...keys];
        [reordered[idx], reordered[nIdx]] = [reordered[nIdx], reordered[idx]];
        reordered.forEach(k => newCats[k] = categories[k]);
        
        Object.keys(categories).forEach(k => delete categories[k]);
        Object.assign(categories, newCats);
        renderSections(); saveLinks();
    }

    function toggleEditCategory() {
        isEditCategoryMode = !isEditCategoryMode;
        document.querySelectorAll('.delete-category-btn, .edit-category-btn, .move-category-btn').forEach(b => b.style.display = isEditCategoryMode ? 'inline-block' : 'none');
        const btn = document.querySelector('.category-manage-btn');
        isEditCategoryMode ? btn.classList.add('active') : btn.classList.remove('active');
    }

    function toggleRemoveMode() {
        removeMode = !removeMode;
        document.querySelectorAll('.edit-btn, .delete-btn').forEach(b => b.style.display = removeMode ? 'flex' : 'none');
        document.querySelectorAll('.card').forEach(c => c.style.cursor = removeMode ? 'default' : 'pointer');
    }

    /* ---------------- 对话框控制 ---------------- */
    let currentConfirmHandler = null;

    function showAddDialog() {
        document.getElementById('dialog-overlay').style.display = 'flex';
        document.getElementById('link-dialog-title').innerText='添加书签';
        
        // 显示弹窗时强制更新分类列表
        updateCategorySelect(); 

        ['name-input','url-input','tips-input','icon-input'].forEach(id => document.getElementById(id).value='');
        document.getElementById('private-checkbox').checked = false;
        
        setupDialogEvents(async () => { await addLink(); });
        setTimeout(() => document.getElementById('name-input').focus(), 50);
    }

    function showEditDialog(link) {
        document.getElementById('dialog-overlay').style.display = 'flex';
        document.getElementById('link-dialog-title').innerText='编辑书签';
        
        // 显示弹窗时强制更新分类列表，并选中当前链接所在分类
        updateCategorySelect(link.category); 

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

    async function addLink() {
        if (!await validateToken()) return;
        const link = getDialogData();
        if (!link) return;
        
        if ([...publicLinks, ...privateLinks].some(l => l.url.toLowerCase() === link.url.toLowerCase())) {
            return customAlert('URL 已存在');
        }

        link.isPrivate ? privateLinks.push(link) : publicLinks.push(link);
        links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;
        
        renderSections(); saveLinks();
        document.getElementById('dialog-overlay').style.display = 'none';
    }

    async function updateLink(oldLink) {
        if (!await validateToken()) return;
        const newLink = getDialogData();
        if (!newLink) return;

        if ([...publicLinks, ...privateLinks].some(l => l.url.toLowerCase() === newLink.url.toLowerCase() && l.url !== oldLink.url)) {
            return customAlert('URL 已存在');
        }

        const list = oldLink.isPrivate ? privateLinks : publicLinks;
        const idx = list.findIndex(l => l.url === oldLink.url);
        if(idx>-1) list[idx] = newLink;
        if(oldLink.isPrivate !== newLink.isPrivate) {
             if(oldLink.isPrivate) { privateLinks.splice(idx,1); publicLinks.push(newLink); }
             else { publicLinks.splice(idx,1); privateLinks.push(newLink); }
        }

        links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;
        saveLinks(); renderSections();
        document.getElementById('dialog-overlay').style.display = 'none';
    }

    function getDialogData() {
        const name = document.getElementById('name-input').value.trim();
        const url = document.getElementById('url-input').value.trim();
        if(!name || !url) { customAlert('名称和地址必填'); return null; }
        return {
            name, url,
            tips: document.getElementById('tips-input').value.trim(),
            icon: document.getElementById('icon-input').value.trim(),
            category: document.getElementById('category-select').value,
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
        card.remove(); saveLinks();
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
        const cat = e.target.closest('.card-container').id;
        updateCardCat(draggedCard, cat);
        saveCardOrder();
        dragEnd();
    }
    function updateCardCat(card, cat) {
        const url = card.getAttribute('data-url');
        [links, publicLinks, privateLinks].forEach(arr => {
            const item = arr.find(l => l.url === url);
            if(item) item.category = cat;
        });
        card.dataset.category = cat;
    }

    async function saveCardOrder() {
        if(!await validateToken()) return;
        const containers = document.querySelectorAll('.card-container');
        let np = [], npr = [], nc = {};
        
        containers.forEach(cont => {
            const cat = cont.id;
            nc[cat] = [];
            [...cont.children].forEach(c => {
                const url = c.getAttribute('data-url');
                const isPriv = c.dataset.isPrivate === 'true';
                const original = links.find(l => l.url === url) || {};
                const link = { name: c.querySelector('.card-title').textContent, url, tips: original.tips, icon: original.icon, category: cat, isPrivate: isPriv };
                isPriv ? npr.push(link) : np.push(link);
                nc[cat].push(link);
            });
        });
        publicLinks = np; privateLinks = npr;
        Object.keys(categories).forEach(k => delete categories[k]); Object.assign(categories, nc);
        await saveLinks();
    }

    async function saveLinks() {
        if (isAdmin && !await validateToken()) return;
        const all = [...publicLinks, ...privateLinks];
        all.forEach(l => { if(!l.status) l.status='ok'; if(!l.lastChecked) l.lastChecked=new Date().toISOString(); });
        try {
            await fetch('/api/saveOrder', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('authToken') }, body: JSON.stringify({ userId: 'testUser', links: all, categories }) });
        } catch(e) {}
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
            customAlert('已进入管理模式');
        } else if (isAdmin) {
            isAdmin = false; removeMode = false; isEditCategoryMode = false;
            document.querySelector('.add-remove-controls').style.display = 'none';
            renderSections();
            customAlert('已退出管理模式');
        }
        updateLoginButton();
    }

    function toggleTheme() { document.body.classList.toggle('dark-theme'); }
    function scrollToTop() { window.scrollTo({top:0, behavior:'smooth'}); }
    window.addEventListener('scroll', () => { document.getElementById('back-to-top-btn').style.display = window.scrollY > 300 ? 'flex' : 'none'; });

    // 悬浮提示
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

    // 自定义弹窗逻辑
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
    function showCategoryDialog(title, def='') {
        return new Promise(res => {
            const d = document.getElementById('category-dialog');
            document.getElementById('category-dialog-title').textContent = title;
            const input = document.getElementById('category-name-input');
            input.value = def; d.style.display = 'flex'; setTimeout(()=>input.focus(),50);
            document.getElementById('category-confirm-btn').onclick = () => { if(input.value.trim()){ d.style.display='none'; res(input.value.trim()); }};
            document.getElementById('category-cancel-btn').onclick = () => { d.style.display='none'; res(null); };
        });
    }

    // 搜索
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

    // 登录验证
    async function performLogin() {
        const pwd = document.getElementById('login-password').value;
        if(!pwd) return;
        try {
            const res = await fetch('/api/verifyPassword', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({password:pwd}) });
            const data = await res.json();
            if(data.valid) {
                isLoggedIn = true; localStorage.setItem('authToken', data.token);
                loadLinks(); document.getElementById('login-modal').style.display='none'; updateLoginButton();
            } else customAlert('密码错误');
        } catch(e) {}
    }
    function hideLoginModal() { document.getElementById('login-modal').style.display='none'; }
    document.getElementById('login-btn').onclick = async () => {
        if(isLoggedIn) { if(await customConfirm('确定退出登录？')) { isLoggedIn=false; isAdmin=false; localStorage.removeItem('authToken'); links=publicLinks; renderSections(); updateLoginButton(); document.querySelector('.add-remove-controls').style.display='none'; } }
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
        if (Date.now() - parseInt(timestamp) > 300 * 60 * 1000) return { isValid: false, status: 401 };
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

      if (url.pathname === '/api/getLinks') {
        const userId = url.searchParams.get('userId');
        const authToken = request.headers.get('Authorization');
        const data = await env.CARD_ORDER.get(userId);

        if (data) {
            const parsedData = JSON.parse(data);
            for (const link of (parsedData.links || [])) if (!link.status) link.status = 'ok';
            
            if (authToken) {
                const validation = await validateServerToken(authToken, env);
                if (validation.isValid) return new Response(JSON.stringify(parsedData), { headers: { 'Content-Type': 'application/json' } });
            }

            const filteredLinks = parsedData.links.filter(link => !link.isPrivate);
            const filteredCategories = {};
            Object.keys(parsedData.categories).forEach(cat => {
                filteredCategories[cat] = parsedData.categories[cat].filter(link => !link.isPrivate);
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
                return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
            }
        } catch (error) { return new Response('Error', { status: 500 }); }
      }

      return new Response('Not Found', { status: 404 });
    }
};
