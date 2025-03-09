import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient({ log: ['error'] })
    // return new PrismaClient({log: ['query', 'info', 'warn', 'error']})
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// Middleware to handle category deletion and menu reassignment
prisma.$use(async (params, next) => {
    if (params.model === 'Category' && params.action === 'delete') {
        const categoryIdToDelete = params.args.where.id;
        console.log({categoryIdToDelete})

        // Find the "General" category
        const generalCategory = await prisma.category.findFirst({
            where: { name: 'General' },
        });

        if (!generalCategory) {
            throw new Error('General category not found! Please ensure it exists.');
        }

        // Reassign menus to the "General" category
        await prisma.menu.updateMany({
            where: { categoryId: categoryIdToDelete },
            data: { categoryId: generalCategory.id },
        });
    }

    // Proceed with the original Prisma operation
    return next(params);
});

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma