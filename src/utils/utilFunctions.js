const parseItem = (item, fields) => {
    let new_item = {}
    fields.forEach(function (field) {
        new_item[field] = item[field]

    })
    return new_item
}

export const parseItems = (items, fields) => {
    return items.map(item => parseItem(item, fields))
}


const parseOrdersSend = (item) => ({
    id: item.id,
    date_arrive: item.date_arrive,
    status: item.status,
    order_type: item.order_type,
    destinationId: item.destinationId,
})

const parseOrdersArrive = (item) => ({})