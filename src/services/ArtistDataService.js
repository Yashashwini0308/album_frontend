import http from "../http-common";

class ArtistDataService{
    getAllArtistForUser(userId){
        return http.get("/artist/user/all",{params:{userId:userId}})
    }

    saveArtistForUser(userId,artist){
        return http.post("/artist/user",{userId:userId,artist:artist})
    }

    updateArtist(userId,artist){
        return http.put("/artist",{userId:userId,artist:artist})
    }

    deleteArtist(artistId){
        return http.delete("/artist/"+artistId)
    }

}

export default new ArtistDataService()