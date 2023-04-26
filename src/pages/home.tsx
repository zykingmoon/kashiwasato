import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/interface";
import { handleData, getTimestamp } from "@/utils";


const url:string = "https://kashiwasato.com/cms/get-posts/"

const MENU = ['project', 'profile', 'line']
const LANG = [{code: "en", title: "english"}, {code: "ja", title: "japanese"}, {code: "cs", title: "chinese"}];


function Loading() {
    return <div className="">Loading...</div>
}
interface Props {
    products: ProductType[];
}
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)
        return () => {
            clearTimeout(timeout);
        }
    }, [value, delay])

    return debouncedValue
}

function Home({products}: Props) {
    const [list, setList] = useState<ProductType[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const [ searchQuery, setSearchQuery ] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const logoRef = useRef(null)
    useEffect(() => {
        setList(products);
        setLoading(false);
    }, [products])
    const [logoText, setLogo] = useState<string>('KASHIWA SATO')
    const textRef = useRef<string>('')
    const handleMouseEnter = useCallback((e: any) => {
        if(textRef.current !== e.target.innerText) {
            textRef.current = e.target.innerText;
            setLogo('')
        }
    }, [])
    useEffect(() => {
        const oriValue = textRef.current
        if (oriValue === '') {
            return
        }
        const curLen = logoText.length
        const oriLen = oriValue.length
        if (curLen >= oriLen ) {
            if(logoText !== oriValue){
                setLogo(oriValue)
                textRef.current = ''
            }
        } else {
            const tmpChar = oriValue[Math.floor(Math.random() * (oriLen - curLen))];

            setTimeout(() => {
                setLogo(logoText + tmpChar)
            }, 5)
        }
    }, [logoText])

    useEffect(() => {
        if (debouncedSearchQuery === "") {
            if(products && products.length !== 0) setList(products);
        } else {
            const newList = products.filter(product => product.title.match(debouncedSearchQuery))
            setList(newList);
        }
    }, [debouncedSearchQuery, products]);

    const onSearch = (e: any) => {
        const searchValue = e.target?.value;
        setSearchQuery(searchValue);
    }
    
    return <div className=" bg-white min-h-full">
        {isLoading ? <Loading />
            : (<>
            <header className="flex justify-between text-xs pt-10 pb-20 md:pt-16 md:pb-16 tracking-widest lead-3">
                <div className="hidden md:block logoDesktop md:pl-9" onMouseEnter={handleMouseEnter} ref={logoRef}>
                    <Link className="flex" href={'/'}>
                        <div className="">{logoText}</div>
                        <div className="hidden lg:block text-gray-400 ml-5">SAMURAI INC. TOKYO</div>
                    </Link>
                </div>
                <div className="block md:hidden logoMobile">
                    <Link href={'/'}>
                        <div className="text-lg leading-4 logoText">KASHIWA SATO</div>
                        <div className="logoDesc text-gray-600">SAMURAI INC. TOKYO</div>
                    </Link>
                </div>
                <div className="hidden md:flex justify-between relative">
                    <ul className="flex mr-7">
                        {
                            MENU.map((menu:string, index: number) => 
                                <li className={`uppercase px-2 ${index===0 ? '':'text-gray-400 border-l border-gray-400'}`} key={`menu-${menu}`}>
                                    <Link href={`/${menu}`}>{menu}</Link> 
                                </li>
                            )
                        }
                    </ul>
                    <ul className="flex mr-16">
                        {
                            LANG.map((lang:{code: string, title: string}, index: number) => 
                                <li className={`uppercase px-2 cursor-pointer ${index===0 ? '':'text-gray-400 border-l border-gray-400'}`} key={`lang-${lang.code}`}>
                                    {lang.title}
                                </li>
                            )
                        }
                    </ul>
                    <div className=" absolute right-5 mt-0.5 w-72 transition group">
                        <input type="text" placeholder="PLEASE INPUT KEYWORD" value={searchQuery} onChange={onSearch} className=" duration-500 ease-in-out group-hover:w-full group-hover:opacity-100 absolute w-20 opacity-0 h-7 z-10 border border-gray-400 px-2 focus:outline-none searchInput"  />
                        <div className="searchBtn absolute right-0 top-0 w-3 h-3 z-20"></div>
                    </div>
                </div>
                <div className="block md:hidden relative h-8 w-8 mr-6 cursor-pointer">
                    <div className="openMenu absolute right-0 top-0 w-8 h-8 z-20"></div>
                </div>
            </header>
            <div className="flex flex-wrap sm:pl-5">
            {
                list.map((product, i) => {
                    const img = product.image
                    return <div className={`w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 3xl:w-1/6 sm:pr-5 lg:pr-16 mb-4`} key={product.id}>
                        <Link className="w-full" href="/project/8153">
                            <Image src={'https://kashiwasato.com' + img["mobile-thumbnail"]} width={100} height={100} alt={product.title} className={`w-full ${product.is_brightness ? 'brightness' : ''}`} />
                            <div className="fontThin tracking-wider">
                                <div className="mt-6 mb-4 ml-6 mr-6 sm:ml-0 sm:mr-0">{product.title}</div>
                                <div className="hidden sm:block text-gray-400 text-xs h-28 leading-5 relative">{
                                    product.credits.map((credit, index) => <div key={`${product.id} - ${index}`} className="ellipsisLine">{credit}</div>)
                                }
                                    <p className="text-black opacity-80 tracking-widest absolute bottom-0"> READ MORE + </p>
                                </div>
                                {
                                    product.desc 
                                        ? <div className="sm:hidden ml-6 mr-6 mb-1 h-14 overflow-hidden text-gray-400 text-xs leading-5 ellipsis">{product.desc}</div>
                                        : <div className="sm:hidden ml-6 mr-6 mb-1 h-14 overflow-hidden text-gray-400 text-xs leading-5">{
                                            product.credits.map((credit, index) => <div key={`${product.id} - ${index}`}>{credit}</div>)
                                        }</div>
                                    
                                }
                            </div>
                        </Link>
                    </div>
                })
            }
            <footer className=" mt-20 ml-20 mb-10 w-full tracking-wider footer">
                <div className="copyright effect-text" >COPYRIGHT &copy; SAMURAI INC. ALL RIGHTS RESERVED.</div>
            </footer>
        </div>
        </>)}
    </div>
  }

  
  Home.getInitialProps = async () => {
    const res = await fetch(`${url}?${getTimestamp()}`)
    const json = await res.json()
    const pdtData: ProductType[] = json.map((item: any) => handleData(item, 'en'))

    return { products: pdtData }
  }
  export default Home