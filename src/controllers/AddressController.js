import Address from '../models/address.model.js'
import httpStatus from 'http-status'
import addressStatus from '../constants/address.status.js'
import urlJoin from 'url-join'

// Address resource controller
// Improvement: Can implement CRUD operations in service layer
export default class AddressController{

    static notFound(res, message='Requested address not found'){
        res.status(httpStatus.NOT_FOUND).send(message);
    }

    // Returns all address documents
    // Can be improved with pagination
    static async all(req, res) {
        const addresses = await Address.find().exec();
        res.send(addresses);
    }

    // Crates a new address
    static async create(req, res){
        const address = await Address.create(req.body);

        const url = urlJoin(req.getPath(), `${address._id}`);
        res.status(httpStatus.CREATED).location(url).send(address);
    }
    
    // Get a single document by id
    static async get(req, res){
        const address = await Address.findById(req.params.id);
        
        if(address){
            res.append('Last-Modified', address.updatedAt.toUTCString());
            res.status(httpStatus.OK).send(address);
        }else{
            AddressController.notFound(res);
        }
    }

    // Update a document
    static async update(req, res){
        const address = await Address.findById(req.params.id);

        if(!address){
            AddressController.notFound(res);
            return;
        }

        if(address.status && address.status !== addressStatus.NOT_AT_HOME){
            res.status(httpStatus.FORBIDDEN).send("You are not allowed to make changes to this address");
            return;
        }

        Object.assign(address, req.body);
        await address.save();
        res.status(httpStatus.OK).end();
    }

    // Delete a document
    static async delete(req, res){
        const address = await Address.findByIdAndDelete(req.params.id);

        if(address){
            res.status(httpStatus.NO_CONTENT).end();
        }else{
            AddressController.notFound(res);
        }
    }
}