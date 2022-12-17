import http from "../http-common";

class TrackDataService{

    saveTrack(track,albumId){
        return http.post("/track",{albumId:albumId,track:track})
    }

    saveTrackForUser(userId,track){
        return http.post("/track/user",{userId:userId,track:track})
    }

    getAllTracks(albumId){
        return http.get("/track/all",{params:{albumId:albumId}});
    }

    getAllTracksForUser(userId){
        return http.get("/track/user/all/",{params:{userId:userId}});
    }
    
    deleteTrack(trackId){
        return http.delete("/track/"+trackId);
    }

    deleteTrackFromAlbum(albumId,trackId){
        return http.delete("/track/album",{params:{albumId:albumId,trackId:trackId}})
    }

    addTrackToAlbum(albumId,trackId){
        return http.post("/album/addTrack",{albumId:albumId,trackId:trackId})
    }

    updateTrack(userId,track){
        return http.put("/track",{userId:userId,track:track})
    }

    


}

export default new TrackDataService();