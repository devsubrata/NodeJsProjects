// const { body : { data }} = {body:{data:[5,9,6]}};

// console.log(body);

const obj = {
    body: {
        data: [5,6,9]
    }
}

const { body : { data } } = {body: {data:[]}};
console.log(data);