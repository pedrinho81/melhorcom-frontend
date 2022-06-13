import IconPhone from "../../assets/icons/iconPhone.png";

export default function Header() {
    return (
        <header className="  bg-[#054A91]">
            <a href="/"
            className="flex justify-center py-3">
                <h1 className="text-[#DAE3ED] font-nunito mr-1 mt-auto text-5xl">M</h1>
            <img src={IconPhone}
                alt="ícone de celular (logo)"
                className="my-auto"
            />
            </a>
            
        </header>
    )
}