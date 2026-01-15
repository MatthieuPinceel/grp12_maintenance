<script setup>
    import imageViewer from '@/components/components/imageViewer.vue';
</script>

<template>
    <div class="home-component">
        <div class="home-component">
            <h1>Welcome to the owl viewer website</h1>
            <p>
                This website is the place for all owl lovers out there to congregate
                and upload images of owls for everyone to see! Check out our gallery
                and see for yourself the wonders of owls.
            </p>

            <div class="background-highlight background-highlight-1"></div>
            <div class="background-highlight background-highlight-2"></div>
        </div>

        <imageViewer/>

    </div>
</template>

<style scoped>
    .home-container {
        display: flex;
        gap: 40px;
        align-items: flex-start;
        margin-top: 40px;
    }

    .background-highlight {
        position: absolute;          
        height: 100%;
        width: 100%;  
    }

    .background-highlight-1 {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        z-index: -1;

        background-color: rgb(137, 124, 119);
    }

    .background-highlight-2 {
        top: 40px; 
        left: 40px;
        right: 40px;
        bottom: 40px;

        z-index: -2;

        background-color: rgb(95, 73, 77);
    }
</style>
