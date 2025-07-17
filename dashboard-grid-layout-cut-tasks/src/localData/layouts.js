export default [
{
    i: 0,
    x: 0,
    y: 0,
    w: 6,
    h: 6,
    options: {
        title: { text: 'График линейный' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
        yAxis: { type: 'value' },
        series: [{ name: 'Продажи', type: 'line', data: [120, 200, 150, 80, 70, 110, 130] }],
    }
}, {
    i: 1,
    x: 6,
    y: 0,
    w: 6,
    h: 6,
    options: {
        title: { text: 'График бар' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'] },
        yAxis: { type: 'value' },
        series: [{ name: 'Продажи', type: 'bar', data: [500, 700, 600, 800, 900, 1000, 1100] }],
    }
}, {
    i: 2,
    x: 0,
    y: 6,
    w: 6,
    h: 6,
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
}, {
    i: 3,
    x: 6,
    y: 6,
    w: 6,
    h: 6,
}, {
    i: 4,
    x: 0,
    y: 12,
    w: 6,
    h: 6,
}
]