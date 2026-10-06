// 다크/라이트 모드 스위치를 동작시키는 코드(JavaScript)입니다. 지금은 몰라도 됩니다.
// 고른 모드는 브라우저에 저장되어, 다른 페이지로 가거나 새로고침해도 유지됩니다.
(function () {
    var root = document.documentElement;

    // 1. 저장해 둔 모드가 있으면 페이지가 그려지기 전에 바로 적용 (깜빡임 방지)
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) {}
    if (saved === "dark" || saved === "light") {
        root.setAttribute("data-theme", saved);
    }

    // 지금 화면이 다크인지 라이트인지 알아내기
    function currentTheme() {
        var chosen = root.getAttribute("data-theme");
        if (chosen) return chosen;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    // 스위치 모양(동그라미 위치, 아이콘) 맞추기
    function updateSwitch(button) {
        var isDark = currentTheme() === "dark";
        button.setAttribute("aria-checked", isDark ? "true" : "false");
        button.querySelector(".knob").textContent = isDark ? "🌙" : "☀️";
    }

    // 2. 페이지가 다 읽히면 스위치에 클릭 기능 연결
    document.addEventListener("DOMContentLoaded", function () {
        var button = document.getElementById("theme-toggle");
        if (!button) return;
        updateSwitch(button);

        button.addEventListener("click", function () {
            var next = currentTheme() === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            try { localStorage.setItem("theme", next); } catch (e) {}
            updateSwitch(button);
        });
    });
})();
