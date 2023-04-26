import { ProductType } from "@/interface";

export function handleData(data: any, lang: string):ProductType {
    const credits:any[] = data?.acf?.credits_thumb ? data.acf.credits_thumb : data?.acf?.credits.slice(0, 4);
    const creditTexts:string[] = [];

    for (let i = 0; i < 4; i++) {
        const credit = credits[i];
        // console.log(credits, i, credit)
        if(credit?.title != null) {
            if(!credit.title || credit.title.toLowerCase() == "title" || credit.title.toLowerCase() == "タイトル"){ 
                creditTexts.push(credit.name);
            } else {
                creditTexts.push(credit.title + " : " + credit.name);
            }
        }
    }
    let desc:string = ""
    if(data.acf.description_en) {
        if(!data.acf["description_"+lang]) lang = "en";
        desc = data.acf["description_"+lang].replace(/<[^>]+>/g, '');
    }
    // console.log(data?.acf?.mobile_image.sizes)
    return {
        id: data.ID,
        title: data?.title || '',
        image: data?.acf?.mobile_image?.sizes,
        credits: creditTexts,
        desc: desc,
        is_brightness: data?.acf?.mobile_image_is_brightness
    }
}

export function getTimestamp() {
    const date = new Date()
    return date.getFullYear()
        + (date.getMonth()+1).toString().padStart(2, '0')
        + date.getDate().toString().padStart(2, '0')
        + date.getHours().toString().padStart(2, '0')
        + date.getMinutes().toString().padStart(2, '0')
        + date.getSeconds().toString().padStart(2, '0')
 }
 