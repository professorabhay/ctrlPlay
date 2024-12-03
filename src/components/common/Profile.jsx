import React from "react";
import { createPulseProfile } from "../../utils/function";
import toast, { Toaster } from "react-hot-toast";
import { createDataItemSigner } from "@permaweb/aoconnect";

export const Profile = () => {
  
  const [usernameInput, setUsernameInput] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState(
    "https://diamondapp.com/assets/img/default-profile-pic.png"
  );
  const [uploadedImage, setUploadedImage] = React.useState(
    "https://diamondapp.com/assets/img/default-profile-pic.png"
  );
  const [isUploading, setIsUploading] = React.useState(false);

  const [nameInput, setNameInput] = React.useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      uploadImage(file);
    }
  };
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "JWT",
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.e30.1Wm0Bv-ylp7zAh0VU2eqUsoca-f5tSFG0shiSlMOKqi6URm5SYTsRXvuRnc5FHpCXzpM7tWQ8erPKfiaQvZK-g"
    );
    formData.append(
      "UserPublicKeyBase58Check",
      "BC1YLgUUf3R6o9oWPTQAnLp6mNzUhSyTR26D6HZgG1Fngoa4gbCn4XJ"
    );

    try {
      setIsUploading(true);
      const response = await fetch(
        "https://node.deso.org/api/v0/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log(data);
      setUploadedImage(data.ImageURL);
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  async function registerPlayer() {
    const wallet = JSON.parse(localStorage.getItem("wallet"));
    window.arweaveWallet = wallet;
    let loadingToast;

    if(!wallet){
      toast.error("Wallet not found in local storage");
      return;
    }

    if(!window.arweaveWallet){
      toast.error("Arweave wallet not detected in window object");
      return;
    }

    try {
      // Input validation
      if (!usernameInput || usernameInput.trim() === "") {
        toast.error("Please enter a username");
        return;
      }

      if (!nameInput || nameInput.trim() === "") {
        toast.error("Please enter your name");
        return;
      }
      if (!window.arweaveWallet) {
        toast.error("Arweave wallet not detected in window object");
        return;
      }

      // Set loading state if you have one

      loadingToast = toast.loading("Registering username...");

      console.log("registering player...");
      console.log(window.arweaveWallet);

      const pulseSetup = await createPulseProfile(
        usernameInput,
        nameInput,
        uploadedImage,
        window.arweaveWallet
      );
      console.log(pulseSetup);
      if (pulseSetup.status === "error") {
        toast.dismiss(loadingToast);
        toast.error(pulseSetup.error);
        return;
      } else {
        toast.dismiss(loadingToast);
        toast.success("Successfully registered");
        window.location.href = "/";
        console.log("Successfully registered");
        return
      }

      // if (pulseSetup.error) {
      //   toast.dismiss(loadingToast);
      //   toast.error(pulseSetup.error);
      //   return;
      // }

      //wait for 1000s

      // Handle response
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(error.message || "Failed to register. Please try again");
    } finally {
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
    }
  }

  return (
    <div>
        <Toaster /> 
      <div className="max-w-2xl mx-auto bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <p className="text-gray-400 text-center mb-2">
            Create your profile to get started!
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-2xl">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/default-avatar.png"
                    alt="Default Profile"
                    className="w-8 h-8"
                  />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-1 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <img
                  src="https://www.svgrepo.com/show/904/photo-camera.svg"
                  alt="Upload"
                  className="w-5 h-5 "
                />
              </label>
            </div>

            <div className="w-full space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                value={usernameInput}
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                }}
              />

              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />

              <button
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={() => {
                  registerPlayer();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center">
                  <ConnectButton
                    onClick={() => {}}
                    accent="#1f1f1f"
                    profileModal={true}
                    showBalance={false}
                    showProfilePicture={true}
                  />
                </div> */}
      </div>
    </div>
  );
};
