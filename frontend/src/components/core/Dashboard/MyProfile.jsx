import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconBtn } from '../../common/IconBtn';

export const MyProfile = () => {

    const {user} = useSelector((state ) => state.profile)
    const navigate = useNavigate();

    return (
      <div className="text-richblack-5">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">My profile</h1>

        {/* SECTION 1 */}

        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <div className="flex items-center gap-x-4">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[78px] rounded-full object-cover "
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold text-richblack-5">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-sm text-richblack-300">
                {user?.email}
              </p>
            </div>
          </div>
          <IconBtn
            text={`Edit`}
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          />
        </div>

        {/* SECTION 2 */}

        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">
              About
            </p>
            <IconBtn
              text={`Edit`}
              onClick={() => navigate("/dashboard/settings")}
            />
          </div>
          <p className="text-richblack-400 text-sm font-medium">
            {user?.additionalDetails?.about ??
              "Write something about Yourself."}
          </p>
        </div>

        {/* SECTION 3 */}

        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">
              Personal Details
            </p>
            <IconBtn
              className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
              text={`Edit`}
              onClick={() => {
                navigate("/dashboard/settings");
              }}
            />
          </div>
          <div className="flex max-w-[500px] justify-between">
            <div className="flex flex-col gap-y-5">
              <div >
                <p className="mb-2 text-sm text-richblack-600">First name</p>
                <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
              </div>

              <div>
                <p className="mb-2 text-sm text-richblack-600">Email</p>
                <p className="text-sm font-medium text-richblack-5">{user?.email}</p>
              </div>

              <div>
                <p className="mb-2 text-sm text-richblack-600">Gender</p>
                <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.gender}</p>
              </div>
            </div>

            <div className="flex flex-col gap-y-5">

              <div>
                <p className="mb-2 text-sm text-richblack-600">Last name</p>
                <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
              </div>

              <div>
                <p className="mb-2 text-sm text-richblack-600">Phone number</p>
                <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.contactNumber}</p>
              </div>

              <div>
                <p className="mb-2 text-sm text-richblack-600">Date of Birth</p>
                <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.dateOfBirth}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
}
