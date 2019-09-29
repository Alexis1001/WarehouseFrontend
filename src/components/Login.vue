<template>

    <form @submit.prevent="login">
        email user  <br>
        <input type="text" name="email" placeholder="email"><br>
        password user <br>
        <input type="password" name="password" placeholder="password"><br><br>
        
        <button type="submit">login</button>

    </form>

</template>

<script>

    export default{

    }



</script>


<style></style>