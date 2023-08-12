import prisma from '../config/database';
import { Prisma } from '@prisma/client';
import { ServiceInfo } from '../types/custom';
import { Pager, pagination, paginate } from '../utils/helper';
import { coordinateCalculator } from '../utils/distanceCalculator'
import { JsonObject } from 'swagger-ui-express';

interface ServiceUpdateInput extends Prisma.ServiceUpdateInput { }

const createService = async (item: any): Promise<ServiceInfo> => {
	return await prisma.service.create({ data: item });
};

const findServiceById = async (
	id: string
): Promise<ServiceInfo | any> => {
	return await prisma.service.findFirst({
		where: { id },
		include: {
			category: true,
			orders: true,
			reviews: true,
			provider: true
		},
	});
};

const getAllUserServices = async (
	userId: string
): Promise<ServiceInfo | any> => {
	return await prisma.service.findMany({
		where: { userId },
		include: {
			category: true,
			orders: true,
			reviews: true
		},
	});
};

const updateUser = async (
	id: string,
	data: ServiceUpdateInput
): Promise<ServiceInfo> => {
	return await prisma.service.update({ where: { id }, data });
};

const destroy = async (id: string): Promise<ServiceInfo> => {
	return await prisma.service.delete({
		where: { id },
		include: {
			orders: true,
			reviews: true
		},
	});
};

const servicesNearYou = async (lat: number, lng: number, skip: number, take: number, page: number, pageSize: number, distanceInKm: number): Promise<JsonObject> => {
	// const maxDistance = 5; // in km
	
	// const services = await prisma.service.findRaw({
	// 	filter: {
	// 		location: { 
	// 			$near : {
	// 				$geometry: { 
	// 					type: "Point",  
	// 					coordinates: [ lng, lat ] 
	// 				},
	// 				$maxDistance: maxDistance
	// 			}
	// 		}
	// 	},
	// 	options: {
	// 		'$skip': skip,
	// 		'$limit': take
	// 	}
	// });

	const services = await prisma.service.findMany({});
	let servicesWith10Km: any[] = [];
	services.forEach((service) => {
		var distance = coordinateCalculator(service.lat!, service.lng!, lat, lng);
		if (distance <= distanceInKm) servicesWith10Km.push({...service, distance_in_km: distance });
	});

	servicesWith10Km = servicesWith10Km.sort((a, b) => a.distance_in_km - b.distance_in_km);
	const startIndex = skip;
	const endIndex = (startIndex + take);
	let data: any;
	let result: any[];
	result = servicesWith10Km.slice(startIndex < 1 ? 0 : startIndex, endIndex);
	data = pagination(result, servicesWith10Km.length, page, pageSize);

	return data;
};

export {
	ServiceUpdateInput,
	createService,
	findServiceById,
	getAllUserServices,
	updateUser,
	destroy,
	servicesNearYou
};