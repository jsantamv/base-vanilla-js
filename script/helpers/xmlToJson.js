// Función para convertir XML a JSON
function xmlToJson(xml) {
    // Crear el objeto JSON vacío
    let obj = {};

    if (xml.nodeType === 1) { // Elemento
        // Atributos del elemento
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                const attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) { // Texto
        return xml.nodeValue.trim();
    }

    // Hacer el recorrido de los elementos hijos
    if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
            const item = xml.childNodes.item(i);
            const nodeName = item.nodeName;
            const nodeValue = xmlToJson(item);

            if (nodeValue === "") {
                continue;
            }

            if (typeof obj[nodeName] === "undefined") {
                obj[nodeName] = nodeValue;
            } else {
                if (!Array.isArray(obj[nodeName])) {
                    obj[nodeName] = [obj[nodeName]];
                }
                obj[nodeName].push(nodeValue);
            }
        }

        // Si el objeto solo tiene una propiedad de texto, regresamos solo ese texto
        if (Object.keys(obj).length === 1 && typeof obj["#text"] === "string") {
            return obj["#text"];
        }
    }

    return obj;
}

// Función para leer el archivo XML y convertirlo a JSON
async function fetchAndConvertXMLtoJSON(path) {
    try {
        // const response = await fetch('patito.xml'); // Asegúrate de que la ruta sea correcta
        const response = await fetch(path); // Asegúrate de que la ruta sea correcta
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
        const json = xmlToJson(xmlDoc);
        
        return json;
    } catch (error) {
        console.error('Error fetching or parsing XML:', error);
    }
}

async function setJson() {
    const jsonData = await fetchAndConvertXMLtoJSON('data/persona.xml');

    await createTableFromJSON(jsonData) 

    console.log(data);
}

setJson();