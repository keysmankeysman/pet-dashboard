export default [
{
    i: 0,
    x: 0,
    y: 0,
    w: 6,
    h: 8,
    options: {
        title: { text: 'График линейный 1' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
        yAxis: { type: 'value' },
        series: [{ name: 'Продажи', type: 'line', data: [120, 200, 150, 80, 70, 110, 130] }],
    }
}, 
{
    i: 1,
    x: 6,
    y: 0,
    w: 6,
    h: 8,
    options: {
        title: { text: 'График бар' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'] },
        yAxis: { type: 'value' },
        series: [{ name: 'Продажи', type: 'bar', data: [500, 700, 600, 800, 900, 1000, 1100] }],
    }
}, 
{
    i: 2,
    x: 6,
    y: 0,
    w: 6,
    h: 8,
    options: {
        title: { text: 'Доходы и расходы 2023' },
        tooltip: { trigger: 'axis' },
        legend: { data: ['Доходы', 'Расходы'], left: 'right'},
        xAxis: {
        type: 'category',
        data: ['1 кв.', '2 кв.', '3 кв.', '4 кв.']},
        yAxis: { type: 'value' },
        series: [
        {
            name: 'Доходы',
            type: 'bar',
            data: [150000, 180000, 210000, 190000],
            itemStyle: { color: '#2196F3' },
        },
        {
            name: 'Расходы',
            type: 'bar',
            data: [80000, 95000, 110000, 105000],
            itemStyle: { color: '#F44336' },
        }]
    },
}, 
{
    i: 3,
    x: 6,
    y: 0,
    w: 6,
    h: 8,
    options: {
    title: { text: 'Население городов (млн)' },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '20%' }, // Для длинных подписей
    xAxis: { type: 'value' },
    yAxis: {
        type: 'category',
        data: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург'],
    },
    series: [
        {
            type: 'bar',
            data: [12.6, 5.4, 1.6, 1.5],
            itemStyle: { color: '#9C27B0' },
            label: { show: true, position: 'right' },
        },
    ],
    },
}, 
{
    i: 4,
    x: 0,
    y: 6,
    w: 6,
    h: 8,
    options: {
        title: { text: 'График круглый', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [{
            name: 'Доля рынка',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 335, name: 'Продукт A' },
                { value: 310, name: 'Продукт B' },
                { value: 234, name: 'Продукт C' },
                { value: 135, name: 'Продукт D' },
                { value: 1548, name: 'Продукт E' },
            ],
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        }]
    }
},
{
    i: 5,
    x: 6,
    y: 6,
    w: 6,
    h: 8,
    options: {
        title: { text: 'График линейный 2' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
        yAxis: { type: 'value' },
        series: [{ name: 'Продажи', type: 'line', data: [15, 30, 25, 18, 12, 20, 22], smooth: true, lineStyle: { width: 3, color: '#EA4335'}, }],
    }
}, 
{
    i: 6,
    x: 0,
    y: 12,
    w: 6,
    h: 8,
    options: {
        title: { text: 'График линейный 3' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Янв', 'Фев', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'] },
        yAxis: { type: 'value' },
        series: [
        {
            name: 'Продажи',
            type: 'line',
            data: [50, 210, 200, 250, 60, 20, 100],
            smooth: true,
            lineStyle: {
                width: 3,
                color: '#4285F4'
            },
            itemStyle: {
                color: '#4285F4'
            }
        },
        {
            name: 'Возвраты',
            type: 'line',
            data: [15, 30, 25, 18, 12, 20, 22],
            smooth: true,
            lineStyle: {
                width: 3,
                color: '#EA4335'
            },
            itemStyle: {
                color: '#EA4335'
            }
        }]
    }
}
]