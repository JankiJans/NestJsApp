import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: 'xs105551-0f0d-2a9f-46b4-c559c8a17999',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: 'po105569-6b8d-2a8y-34c4-c559c8a14555',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'ui105569-2o8d-2a8y-14c4-c559c8a89444',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
  ];
}

function getClients() {
  return [
    {
      id: 'xs105551-0f0d-2a9f-46b4-c559c8a17999',
      name: 'Mikolaj Kopernik',
      address: 'Hollywood'
    },
    {
        id: 'po105569-6b8d-2a8y-34c4-c559c8a14555',
        name: 'Travis Kowalski',
        address: 'New York'
    },
    {
        id: 'ui105569-2o8d-2a8y-14c4-c559c8a89444',
        name: 'Frank Champion',
        address: 'Boston'
    }
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getClients().map((client) => {
        return db.client.create({ data: client})
    })
  )

  await Promise.all(
    getOrders().map(({ productId, clientId, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: {id: clientId},
          }
        },
      });
    }),
  );
}

seed();
