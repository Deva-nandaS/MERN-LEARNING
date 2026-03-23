export const Sidebar=()=>{
    return(
        <div className="h-screen flex flex-col w-60 bg-white">
        {/* Top section */}
        <div className="border-b flex item-center justify-between p-8">
        <img  className="w-11 h-11 rounded-full" src="/FigLogo.png" alt="FigLogo"/>
         <div>
            <p className="font-semibold text-sm">Fig Labs</p>
            <p className="text-xs text-gray-500">Enterprise</p>
        </div>
        </div>
      
        <div className="flex flex-col gap-5 text-xl font-medium p-4 ml-6 text-gray-500">
            <p>Notebooks</p>
            <p>Integrations</p>
            <p>Knowledge</p>
            <p>Automations</p>
            <p>New Thread</p>
            <p>Threads</p>
        </div>
        </div>
    )
}