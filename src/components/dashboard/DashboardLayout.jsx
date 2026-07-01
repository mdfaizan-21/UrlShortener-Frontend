import React, { useState } from 'react'
import Graph from './Graph'
import { dummyData } from '../../dummyData/data'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery'
import ShortenPopUp from './ShortenPopUp'
import { FaLink } from 'react-icons/fa'
import ShortenUrlList from './ShortenUrlList'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'

const DashboardLayout = () => {
  // const refetch = false;
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  function onError() {
    navigate("/error");
  }
  const { isLoading, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError)

  const { isLoading: loader, data: totalClicks } = useFetchTotalClicks(token, onError)

  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)] relative z-10">
      {loader ? (
        <Loader />
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-16">
          <div className="h-96 relative glass-panel rounded-2xl p-6 mb-8">
            {totalClicks.length === 0 && (
              <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                <h1 className="text-white font-bold sm:text-2xl text-lg mb-2">
                  No Data For This Time Period
                </h1>
                <h3 className="sm:w-96 w-[90%] text-center sm:text-base text-sm text-gray-400">
                  Share your short link to view where your engagements are
                  coming from.
                </h3>
              </div>
            )}
            <Graph graphData={totalClicks} />
          </div>
          
          <div className='py-5 flex justify-end'>
            <button
              className='bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer shadow-lg shadow-white/5'
              onClick={() => setShortenPopUp(true)}>
              Create New Short URL
            </button>
          </div>

          <div>
            {!isLoading && myShortenUrls.length === 0 ? (
              <div className="flex justify-center pt-16">
                <div className="flex gap-3 items-center justify-center py-8 px-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl">
                  <FaLink className="text-violet-500 sm:text-2xl text-xl" />
                  <h1 className="text-white font-semibold sm:text-lg text-base">
                    You haven't created any short links yet
                  </h1>
                </div>
              </div>
            ) : (
              <ShortenUrlList data={myShortenUrls} />
            )}
          </div>
        </div>
      )}

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  )
}

export default DashboardLayout