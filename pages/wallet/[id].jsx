import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { Layout } from 'components/users';
import { userService, alertService } from 'services';

export default Wallet;

function Wallet({id}) {
    const [user, setUser] = useState(null);
    const [wallet, setWallet] = useState(null);   

    useEffect(() => {
        // fetch user and set default form values if in edit mode
        userService.getById(id)
            .then(x => setUser(x))
            .catch(alertService.error)        
    }, []);


    const connection = useCallback(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        let signer;
        provider.send("eth_requestAccounts", []).then(signer = provider.getSigner())
        signer.getAddress().then(function(result){setWallet(result)})
        

        /*const provider = new ethers.providers.JsonRpcProvider();
        const signer = provider.getSigner()
        let wall;
        if(user.phrase != null){
            wall = ethers.Wallet.fromMnemonic(user.phrase).connect(provider)
        } else {
            wall = ethers.Wallet.createRandom().connect(provider) 
            user.privateKey = wall?.privateKey
            user.phrase = wall?.mnemonic.phrase     
        }
        setWallet(wall);
        userService.update(id, user)
        .then(() => {
            console.log("hola")
        })
        .catch(alertService.error);
        */
    });

    return (
        <Layout>
            <h1>Wallet</h1>
            { wallet ? <> <h2>Your address is { wallet }</h2> </>
            : <>
            <button onClick={connection} type="button"className="btn btn-secondary">Crear wallet</button>
            </>}
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}
