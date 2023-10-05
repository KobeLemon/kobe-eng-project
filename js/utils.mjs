const contentBox = document.querySelector('.contentBox');

const loadingPageNum = (pageCounter) => {document.querySelector('#loadingPageNum').innerHTML = `<em>Loading Page # ${pageCounter}...</em>`};

export function headerRender(location) {
    const parentLocation = document.querySelector('#header');
    loadingPageNum(1);
    
    let template =
        `<h1>${location} of Star Wars</h1>
        <nav>
            <h2><a href="../index.html">Home</a></h2>
            <h2><a href="../people/">People</a></h2>
            <h2><a href="../planets/">Planets</a></h2>
            <h2><a href="../films/">Films</a></h2>
            <h2><a href="../species/">Species</a></h2>
            <h2><a href="../vehicles/">Vehicles</a></h2>
            <h2><a href="../starships/">Starships</a></h2>
        </nav>`;

    parentLocation.insertAdjacentHTML('afterbegin', template);    
}

export async function apiFetch(url) {
    // console.log(url);
    // console.log('entered apiFetch');
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            return data;
        } else {
            throw new Error(await response.text);
        }
    } catch (error) {
        console.log(error);
    }
}

export function renderApiInfo(apiInfo, templateFunc) {
    // console.log("entered renderApiInfo");
    // console.log(apiInfo);
    // console.log(`previous page: ${apiInfo.previous}`);
    // console.log(`next page: ${apiInfo.next}`);

    contentBox.innerHTML = '';
    const backToTopBox = document.querySelector('.backToTopBox');
    backToTopBox.innerHTML = '';

    // console.log(apiInfo);
    // console.log(apiInfo.previous);
    // console.log(document.querySelector('#previousPage'))

    if (apiInfo.previous == null) {
        document.querySelector('#previousPage').classList.add('displayNone');
    } else if (apiInfo.previous !== null) {
        document.querySelector('#previousPage').classList.remove('displayNone');
    } 
    if (apiInfo.next == null) {
        document.querySelector('#nextPage').classList.add('displayNone');
    } else if (apiInfo.next !== null) {
        document.querySelector('#nextPage').classList.remove('displayNone');
    }

    apiInfo.results.filter(item => item.name != 'unknown').forEach((item) => {
        // console.log('apiInfoResults foreach:');
        // console.log(item.hair_color);
        const template = templateFunc(item);
        // console.log(template);
        contentBox.insertAdjacentHTML('beforeend', template);
    });
    document.querySelector('#loadingPageNum').innerHTML = '';
    backToTopBox.insertAdjacentHTML('beforeend', '<button class="backToTopBtn">Back To Top</button>');
    backToTopBox.addEventListener('click', () => {document.querySelector('#header').scrollIntoView({behavior: "smooth"})});
}

export async function changePage(pageCounter, apiURL, templateFunc, nextPageFunc) {
    document.querySelector('#nextPage').disabled = true;
    document.querySelector('#previousPage').disabled = true
    contentBox.innerHTML = '';
    // if (pageCounter <= 0) {
    //     pageCounter = 1;
    // }
    // console.log(`pageCounter: ${pageCounter}`);
    document.querySelector('#currentPage').innerText = pageCounter;
    // document.querySelector('#loadingPageNum').innerHTML = `<em>Loading Page # ${pageCounter}...</em>`;
    loadingPageNum(pageCounter);
    const newApiInfo = await apiFetch(apiURL(pageCounter));
    renderApiInfo(newApiInfo, templateFunc);
    document.querySelector('#loadingPageNum').innerHTML = '';
    document.querySelector('#nextPage').disabled = false;
    document.querySelector('#previousPage').disabled = false;
}

export function capitalizeSentence(sentence) {
    let string = sentence.split(' ');
    let newString = []
    string.forEach( (item) => {
        let itemSplit = item.split('');
        itemSplit[0] = itemSplit[0].toUpperCase();
        let itemJoin = itemSplit.join('')
        newString.push(itemJoin)
    })
    return newString = newString.join(' ');
}