import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';


export default function CurrentTrack() {
    const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing',
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                }
            );
            if (response.data !== "") {
                const { item } = response.data
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artists) => artists.name),
                    image: item.album.images[2].url,
                };
                console.log(currentlyPlaying.name);
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying })
            }
        };
        getCurrentTrack();
    }, [token, dispatch])
    return (
        <Container>
            {currentlyPlaying && (
                <div className="track">
                    <div className="track_image">
                        <img src={currentlyPlaying.image} alt="currentlyPlaying" />
                    </div>
                    <div className="track_info">
                        <h4 className='track_name'>{currentlyPlaying.name}</h4>
                        <h6 className='track_artists'>
                            {currentlyPlaying.artists.join(" , ")}</h6>
                    </div>
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &_info {
      .track_name {
        color: white;
        /* margin-bottom:0; */
      }
      .track_artists {
        /* margin-top:0; */
        color: #b3b3b3;
      }
    }
  }
`;