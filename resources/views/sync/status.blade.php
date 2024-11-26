<div class="sync-container">
    <div class="sync-status">
        <h3>حالة المزامنة</h3>
        <div id="sync-status">جاري المزامنة...</div>
        <div class="progress-bar">
            <div id="sync-progress" style="width: 0%"></div>
        </div>
    </div>

    <div class="sync-actions">
        <button onclick="syncManager.startSync()">بدء المزامنة</button>
        <button onclick="syncManager.pauseSync()">إيقاف مؤقت</button>
    </div>

    <div class="sync-log">
        <h4>سجل المزامنة</h4>
        <div id="sync-log-entries"></div>
    </div>
</div> 