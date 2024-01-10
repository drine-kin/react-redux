export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="flex justify-center items-center bg-themeColor2 text-white h-16">
            <div className='py-5'>
                Copyright &copy; {currentYear} Electrix Shop 
            </div>
        </footer>
    )
}
