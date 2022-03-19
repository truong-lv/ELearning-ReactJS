
import { Fragment } from 'react'

export default function CreditClassPosts({ posts }) {
    console.log(posts)
    return (
        <Fragment>
            {posts === undefined ? console.log('Post undefined') :
                <div>
                    {posts.map((value) => {
                        return (
                            <p>{value.postContent}</p>
                        )
                    })}
                </div>
            }
        </Fragment>
    )
}