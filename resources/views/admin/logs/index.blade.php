<div class="logs-container">
    <h2>سجلات النظام</h2>
    
    <div class="filters">
        <select id="logLevel">
            <option value="all">جميع المستويات</option>
            <option value="info">معلومات</option>
            <option value="warning">تحذيرات</option>
            <option value="error">أخطاء</option>
            <option value="critical">أخطاء حرجة</option>
        </select>
        
        <input type="date" id="dateFilter">
    </div>

    <div class="logs-table">
        <table>
            <thead>
                <tr>
                    <th>التاريخ والوقت</th>
                    <th>المستوى</th>
                    <th>الرسالة</th>
                    <th>التفاصيل</th>
                </tr>
            </thead>
            <tbody>
                @foreach($logs as $log)
                <tr class="log-entry {{ $log['level'] }}">
                    <td>{{ $log['datetime'] }}</td>
                    <td>{{ $log['level'] }}</td>
                    <td>{{ $log['message'] }}</td>
                    <td>
                        @if(!empty($log['context']))
                            <button onclick="showDetails({{ json_encode($log['context']) }})">
                                عرض التفاصيل
                            </button>
                        @endif
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div> 