// const test = require('./../../teste.json');

const cleanApi = (arr) =>
    arr.map((elem) => {
        return {
            id: elem.id,
            name: elem.name,
            temperament: elem.temperament,
            image: elem.image.url,
            life_span_min: elem.life_span && elem.life_span.includes('-') ? parseInt(elem.life_span.split(' - ')[0].trim()) : null,
            life_span_max: elem.life_span && elem.life_span.includes('-') ? parseInt(elem.life_span.split(' - ')[1].trim()) : null,
            height_min: elem.height && elem.height.metric && elem.height.metric.includes('-') ? parseInt(elem.height.metric.split(' - ')[0].trim()) : null,
            height_max: elem.height && elem.height.metric && elem.height.metric.includes('-') ? parseInt(elem.height.metric.split(' - ')[1].trim()) : null,
            weight_min: elem.weight && elem.weight.metric && elem.weight.metric.includes('-') ? parseInt(elem.weight.metric.split(' - ')[0].trim()) : null,
            weight_max: elem.weight && elem.weight.metric && elem.weight.metric.includes('-') ? parseInt(elem.weight.metric.split(' - ')[1].trim()) : null,
        };
    });

const cleanApiById = (elem) => {
    return {
        id: elem.id,
            name: elem.name,
            temperament: elem.temperament,
            image: elem.image.url,
            life_span_min: elem.life_span && elem.life_span.includes('-') ? parseInt(elem.life_span.split(' - ')[0].trim()) : null,
            life_span_max: elem.life_span && elem.life_span.includes('-') ? parseInt(elem.life_span.split(' - ')[1].trim()) : null,
            height_min: elem.height && elem.height.metric && elem.height.metric.includes('-') ? parseInt(elem.height.metric.split(' - ')[0].trim()) : null,
            height_max: elem.height && elem.height.metric && elem.height.metric.includes('-') ? parseInt(elem.height.metric.split(' - ')[1].trim()) : null,
            weight_min: elem.weight && elem.weight.metric && elem.weight.metric.includes('-') ? parseInt(elem.weight.metric.split(' - ')[0].trim()) : null,
            weight_max: elem.weight && elem.weight.metric && elem.weight.metric.includes('-') ? parseInt(elem.weight.metric.split(' - ')[1].trim()) : null,
    }
}

module.exports = {
    cleanApi,
    cleanApiById,
};
