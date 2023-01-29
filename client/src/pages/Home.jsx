   import React, { useEffect, useState } from 'react'
 import {Card,Loader,FormField} from "../components/index"
 const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};
 const Home = () => {
  const [loading,setLoading]=useState(false)
  const [allPosts,setAllPosts]=useState(null)
  const [search,setSearch]=useState('')
  const [searchres,setSearchres]=useState(null)
  const [searchTimeout,setSearchTimeout]=useState(null)
  useEffect(() => {
    const fetchpost=async()=>{
      setLoading(true)
      try {
        console.log("Entered")
        const response=await fetch('http://localhost:5000/api/v1/post',{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
          },
        })
        console.log("Exited")
        if (response.ok) {
          const result=await response.json()
          
          setAllPosts(result.data)
          console.log(result.data[0]);
          console.log(allPosts);
        }
        else{
          alert("failed to fetch")
        }

      } catch (error) {
        console.log(error)
        console.log(error.message)
        alert(error)
      }finally{
        setLoading(false)
      }
    }
    fetchpost();
  }, [])
  const handleSearchChange=(e)=>{
    setSearch(e.target.value)
    clearTimeout(searchTimeout)
    setSearchTimeout(

      setTimeout(()=>{
        const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.prompt.toLowerCase().includes(search.toLowerCase()));
        setSearchres(searchResults)
      },500)
    )
  }
   return (
     <section className='max-w-7xl mx-auto'>
        <div>
          <h1 className='font-extrabold text-[#222328] text-[32px] '>
            The Community's work!!
          </h1>
          <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>
            Browse through the collection of imaginative and visually stunning images generated  by DALL-E AI
          </p>
        </div>
        <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={search}
          handleChange={handleSearchChange}
        />
      </div>
        <div className='mt-10'>
          {
             loading?(
              <div className='flex justify-center items-center'>
                <Loader/>
                </div>
             ):<>
             {search&&(<h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for <span className='text-[#222328]'>{search}</span>
             </h2>)}
             <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                {search?(<RenderCards
                data={searchres}
                title="No Search Results found"/>):
                <RenderCards
                data={allPosts}
                title='No Posts found'
                />}
             </div>
             </>
          }
        </div>
     </section>
   )
 }
 
 export default Home